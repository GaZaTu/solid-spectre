// css
import "../css/input-select.css"
import "./Input.css"
// js
import { ComponentProps, createMemo, createRenderEffect, Show, splitProps, useContext } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { ThemeSize } from "../util/theming"
import { FormContext } from "./Form.Context"
import { FormGroupContext } from "./Form.Group.Context"
import { Icon } from "./Icon"
import { InputGroup } from "./Input.Group"

type Props = {
  size?: ThemeSize
  hasError?: boolean
  inline?: boolean

  iconSrcLeft?: string
  iconSrcRight?: string
  loading?: boolean

  id?: string
  ifEmpty?: string | null

  multiline?: boolean | "expandable"

  onTextChange?: (text: string | null) => unknown
}

const createProps = createHTMLMemoHook((props: Props) => {
  const generatedId = Math.random().toString(36).substr(2, 10)

  return {
    get id() {
      return props.id ?? generatedId
    },
    get class() {
      return classnames({
        "form-input": true,
        "input-inline": props.inline,
        [`input-${props.size}`]: !!props.size,
        "is-error": props.hasError,
      })
    },
  }
})

function Input_(props: Props & ComponentProps<"input">) {
  const [fml, __props] = splitProps(props, ["children", "iconSrcLeft", "iconSrcRight"])
  const [_props] = createProps(__props)

  const form = useContext(FormContext)

  const formGroup = useContext(FormGroupContext)
  createRenderEffect(() => {
    if (_props.id) {
      formGroup.setInputId(_props.id)
    }
    if (_props.name) {
      formGroup.setInputName(_props.name)
    }
  })

  const value = createMemo(() => {
    if (_props.value !== undefined) {
      return _props.value
    }

    if (!_props.name) {
      return undefined
    }

    if (_props.type === "file") {
      return ""
    }

    const value = form.getValue(_props.name) ?? ""
    return value
  })

  const handleInput = (ev: InputEvent & { currentTarget: HTMLInputElement | HTMLTextAreaElement | HTMLDivElement }) => {
    (_props.oninput as any)?.(ev)

    if (ev.cancelBubble) {
      return
    }

    if (!_props.name) {
      return
    }

    if (_props.type === "file") {
      const fileList = (ev.currentTarget as HTMLInputElement).files
      const fileArray = [] as File[]
      for (let i = 0; i < (fileList?.length ?? 0); i++) {
        fileArray.push(fileList!.item(i)!)
      }

      form.setValue(_props.name, fileArray)
      return
    }

    let value: string | number | null = (() => {
      if (ev.currentTarget instanceof HTMLDivElement) {
        return ev.currentTarget.innerText
      } else {
        if (_props.type === "number") {
          return (ev.currentTarget as HTMLInputElement).valueAsNumber
        } else {
          return ev.currentTarget.value
        }
      }
    })()
    if ((value === "" || (typeof value === "number" && isNaN(value))) && _props.ifEmpty !== undefined) {
      value = _props.ifEmpty
    }

    (_props.onTextChange)?.(String(value))

    form.setValue(_props.name, value)
  }

  const handleBlur = (ev: FocusEvent) => {
    (_props.onblur as any)?.(ev)

    if (ev.cancelBubble) {
      return
    }

    if (!_props.name) {
      return
    }

    form.setTouched(_props.name, true)
  }

  const createInput = () => (
    <Show when={_props.multiline} fallback={
      <input value={value()} oninput={handleInput} onblur={handleBlur} placeholder={formGroup.labelAsString() ?? _props.placeholder} {..._props} />
    }>
      <Show when={_props.multiline === "expandable"} fallback={
        <textarea value={value()} oninput={handleInput} onblur={handleBlur} placeholder={formGroup.labelAsString() ?? _props.placeholder} {..._props as {}} />
      }>
        <div role="textbox" contenteditable innerText={value()} oninput={handleInput} onblur={handleBlur} aria-multiline aria-placeholder={formGroup.labelAsString() ?? _props.placeholder} aria-readonly={_props.readonly} aria-required={_props.required} {..._props as {}} />
      </Show>
    </Show>
  )

  return (
    <>
      <Show when={props.loading || props.iconSrcLeft || props.iconSrcRight}>
        <span classList={{ "has-icon-left": !!props.iconSrcLeft, "has-icon-right": !!props.iconSrcRight }}>
          {createInput()}
          <Show when={!props.loading} fallback={<Icon src="loading" />}>
            <Icon src={props.iconSrcLeft} class="is-left" />
            <Icon src={props.iconSrcRight} class="is-right" />
          </Show>
          {fml.children}
        </span>
      </Show>

      <Show when={!props.iconSrcLeft}>
        {createInput()}
        {fml.children}
      </Show>
    </>
  )
}

export const Input = Object.assign(Input_, {
  Group: InputGroup,
})
