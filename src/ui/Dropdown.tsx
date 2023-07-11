// css
import "./Dropdown.css"
// js
import { Component, ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { Menu } from "./Menu"

type Props = {
  right?: boolean
  active?: boolean
  useHover?: boolean

  toggle: Component<any>
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "dropdown": true,
        "dropdown-right": props.right,
        "active": props.active,
        "dropdown-use-hover": props.useHover,
      })
    },
  }
})

function Dropdown_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  const [toggleProps, dropdownProps] = splitProps(_props, [
    "toggle",
  ])

  return (
    <div {...dropdownProps}>
      {toggleProps.toggle({
        tabIndex: 0,
        "data-dropdown-toggle": "true",
      })}
      {fml.children}
    </div>
  )
}

export const Dropdown = Object.assign(Dropdown_, {
  createProps,
  Menu: Menu,
})
