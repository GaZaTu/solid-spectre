// css
import "./Slider.css"
// js
import { ComponentProps, createMemo, createRenderEffect, useContext } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { FormContext } from "./Form.Context"
import { FormGroupContext } from "./Form.Group.Context"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "slider": true,
      })
    },
  }
})

function Slider_(props: Props & ComponentProps<"input">) {
  const [inputProps] = createProps(props)

  const form = useContext(FormContext)

  const formGroup = useContext(FormGroupContext)
  createRenderEffect(() => {
    formGroup.setInputId(inputProps.id)
    formGroup.setInputName(inputProps.name)
  })

  const value = createMemo(() => {
    if (inputProps.value !== undefined) {
      return inputProps.value
    }

    if (!inputProps.name) {
      return undefined
    }

    const value = form.getValue(inputProps.name) ?? false
    return value
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
    <input value={value()} oninput={handleInput} onblur={handleBlur} {...inputProps} type="range" />
  )
}

export const Slider = Object.assign(Slider_, {
})
