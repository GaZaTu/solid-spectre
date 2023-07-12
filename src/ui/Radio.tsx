// css
import "../css/checkbox-radio-switch.css"
import "../css/checkbox-radio.css"
import "./Radio.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { ThemeSize } from "../util/theming"

type Props = {
  size?: ThemeSize
  hasError?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "form-radio": true,
        [`input-${props.size}`]: !!props.size,
        "is-error": props.hasError,
      })
    },
  }
})

function Radio_(props: Props & ComponentProps<"input">) {
  const [containerProps, inputProps] = splitProps(props, [
    "children",
    "class",
    "classList",
    "style",
    "children",
    "size",
    "hasError",
  ])

  const [_containerProps] = createProps(containerProps)

  return (
    <label {..._containerProps}>
      <input {...inputProps} type="radio" />
      <i class="form-icon" />
      {containerProps.children}
    </label>
  )
}

export const Radio = Object.assign(Radio_, {
})
