// css
import "./Toast.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { ThemeColor } from "../util/theming"

type Props = {
  color?: ThemeColor
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "toast": true,
        [`toast-${props.color}`]: !!props.color,
      })
    },
  }
})

function Toast_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div role="alert" {..._props}>
      {fml.children}
    </div>
  )
}

export const Toast = Object.assign(Toast_, {
  createProps,
})
