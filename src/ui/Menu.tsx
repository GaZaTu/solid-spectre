import { classnames } from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import { MenuItem } from "./Menu.Item"
import "./Menu.css"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

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
    <ul {..._props}>
      {fml.children}
    </ul>
  )
}

export const Menu = Object.assign(Menu_, {
  createProps,
  Item: MenuItem,
})
