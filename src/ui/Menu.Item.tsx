// css
import "./Menu.css"
// js
import { ComponentProps, JSX, Show, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
  active?: boolean
  disabled?: boolean
  focused?: boolean
  badge?: JSX.Element
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "menu-item": true,
        "active": props.active,
        "disabled": props.disabled,
        "focused": props.focused,
      })
    },
  }
})

function MenuItem_(props: Props & ComponentProps<"li">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <li role="menuitem" {..._props}>
      {fml.children}
      <Show when={props.badge}>
        <span class="menu-badge">{props.badge}</span>
      </Show>
    </li>
  )
}

export const MenuItem = Object.assign(MenuItem_, {
  createProps,
})
