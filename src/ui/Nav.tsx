// css
import "./Nav.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { NavItem } from "./Nav.Item"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "nav": true,
      })
    },
  }
})

function Nav_(props: Props & ComponentProps<"ul">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <ul {..._props}>
      {fml.children}
    </ul>
  )
}

export const Nav = Object.assign(Nav_, {
  createProps,
  Item: NavItem,
})
