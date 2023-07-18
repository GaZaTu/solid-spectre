// css
import "./Menu.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { MenuItem } from "./Menu.Item"

type Props = {
  transparent?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "menu": true,
        "menu-nav": props.transparent,
      })
    },
  }
})

function Menu_(props: Props & ComponentProps<"ul">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <ul role="menu" {..._props}>
      {fml.children}
    </ul>
  )
}

export const Menu = Object.assign(Menu_, {
  createProps,
  Item: MenuItem,
})
