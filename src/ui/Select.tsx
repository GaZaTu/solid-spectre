// css
import "../css/input-select.css"
import "./Select.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { ThemeSize } from "../util/theming"

type Props = {
  size?: ThemeSize
  hasError?: boolean

  id?: string
}

const createProps = createHTMLMemoHook((props: Props) => {
  const generatedId = Math.random().toString(36).substr(2, 10)

  return {
    get id() {
      return props.id ?? generatedId
    },
    get class() {
      return classnames({
        "form-select": true,
        [`select-${props.size}`]: !!props.size,
        "is-error": props.hasError,
      })
    },
  }
})

function Select_(props: Props & ComponentProps<"select">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <select {..._props}>
      {fml.children}
    </select>
  )
}

export const Select = Object.assign(Select_, {
  createProps,
})
