// css
import "./CheckboxButton.css"
// js
import { Component, ComponentProps, createMemo, createRenderEffect, JSX, Show, splitProps, useContext } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { Button } from "./Button"
import { FormContext } from "./Form.Context"
import { FormGroupContext } from "./Form.Group.Context"

const Defaults = {
  IfTrue: (() => undefined) as Component,
  IfFalse: (() => undefined) as Component,
  IfIndeterminate: (() => undefined) as Component,
}

type Props = {
  checked?: boolean
  indeterminate?: boolean
  ifTrue?: JSX.Element
  ifFalse?: JSX.Element
  ifIndeterminate?: JSX.Element
  onblur?: ComponentProps<typeof Button>["onclick"]
  oninput?: ComponentProps<typeof Button>["onclick"]
  onclick?: ComponentProps<typeof Button>["onclick"]
  reversed?: boolean
  useColor?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "form-checkbox-button": true,
      })
    },
  }
})

function CheckboxButton_(props: Props & ComponentProps<typeof Button>) {
  const [fml, _props] = splitProps(props, ["children", "ifTrue", "ifFalse", "ifIndeterminate", "onblur", "oninput", "onclick"])

  const [__props] = createProps(_props)

  const form = useContext(FormContext)

  const formGroup = useContext(FormGroupContext)
  createRenderEffect(() => {
    formGroup.setInputId(props.id)
    formGroup.setInputName(props.name)

    formGroup.setLabelHidden(true)
  })

  const checked = createMemo(() => {
    if (props.checked !== undefined) {
      return props.checked
    }

    if (!props.name) {
      return undefined
    }

    const checked = form.getValue(props.name) ?? false
    return checked
  })

  const handleClick: ComponentProps<typeof Button>["onclick"] = ev => {
    void (fml.onblur as any)?.(ev)
    void (fml.oninput as any)?.(ev)
    void (fml.onclick as any)?.(ev)

    if (ev.cancelBubble) {
      return
    }

    if (!props.name) {
      return
    }

    form.setTouched(props.name, true)
    form.setValue(props.name, !checked())
  }

  const label = createMemo(() => {
    const arg = fml.children
    const raw = formGroup.label()
    const str = formGroup.labelAsString()
    return arg ?? raw ?? str
  })

  return (
    <Button type="button" color={props.useColor ? (checked() ? "primary" : "gray") : "transparent"} action={!label()} circle={!label()} {...__props} onclick={handleClick}
      role="checkbox"
      aria-checked={props.indeterminate ? "mixed" : props.checked}
    >
      <Show when={!props.useColor}>
        <Show when={props.indeterminate} fallback={
          <Show when={(checked() && !props.reversed) || (!checked() && props.reversed)} fallback={
            ((fml.ifFalse ?? <Defaults.IfFalse />))
          }>
            {(fml.ifTrue ?? <Defaults.IfTrue />)}
          </Show>
        }>
          {(fml.ifIndeterminate ?? <Defaults.IfIndeterminate />)}
        </Show>
      </Show>
      <Show when={label()} fallback={fml.children}>
        <span>{label()}</span>
      </Show>
    </Button>
  )
}

export const CheckboxButton = Object.assign(CheckboxButton_, {
  Defaults,
})
