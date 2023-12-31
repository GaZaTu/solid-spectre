// css
import "../css/checkbox-radio-switch.css"
import "../css/checkbox-radio.css"
import "./Checkbox.css"
// js
import { ComponentProps, createMemo, createRenderEffect, Show, splitProps, useContext } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { ThemeSize } from "../util/theming"
import { FormContext } from "./Form.Context"
import { FormGroupContext } from "./Form.Group.Context"

type Props = {
  size?: ThemeSize
  hasError?: boolean

  indeterminate?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "form-checkbox": true,
        [`input-${props.size}`]: !!props.size,
        "is-error": props.hasError,
      })
    },
  }
})

function Checkbox_(props: Props & ComponentProps<"input">) {
  const [containerProps, inputProps] = splitProps(props, [
    "children",
    "class",
    "classList",
    "style",
    "size",
    "hasError",
  ])

  const [_containerProps] = createProps(containerProps)

  const form = useContext(FormContext)

  const formGroup = useContext(FormGroupContext)
  createRenderEffect(() => {
    formGroup.setInputId(inputProps.id)
    formGroup.setInputName(inputProps.name)

    formGroup.setLabelHidden(true)
  })

  const checked = createMemo(() => {
    if (inputProps.checked !== undefined) {
      return inputProps.checked
    }

    if (!inputProps.name) {
      return undefined
    }

    const checked = form.getValue(inputProps.name) ?? false
    return checked
  })

  const handleInput: ComponentProps<"input">["oninput"] = ev => {
    (inputProps.oninput as any)?.(ev)

    if (ev.cancelBubble) {
      return
    }

    if (!inputProps.name) {
      return
    }

    form.setValue(inputProps.name, ev.currentTarget.checked)
  }

  const handleBlur: ComponentProps<"input">["onblur"] = ev => {
    (inputProps.onblur as any)?.(ev)

    if (ev.cancelBubble) {
      return
    }

    if (!inputProps.name) {
      return
    }

    form.setTouched(inputProps.name, true)
  }

  return (
    <label {..._containerProps}>
      <input checked={checked()} oninput={handleInput} onblur={handleBlur} {...inputProps} type="checkbox" />
      <i class="form-icon" />
      <Show when={formGroup.label() || formGroup.labelAsString()} fallback={containerProps.children}>
        <span>{formGroup.label() ?? formGroup.labelAsString()}</span>
      </Show>
    </label>
  )
}

export const Checkbox = Object.assign(Checkbox_, {
})
