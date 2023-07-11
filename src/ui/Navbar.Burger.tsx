// css
import "./Navbar.css"
// js
import { ComponentProps, createMemo } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { Button } from "./Button"
import { Icon } from "./Icon"

type Props = {
  expanded?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "navbar-burger": true,
      })
    },
  }
})

function NavbarBurger_(props: Props & ComponentProps<typeof Button>) {
  const [_props] = createProps(props)

  const icon = createMemo(() => {
    return props.expanded ? Icon.Context.iconCross : Icon.Context.iconMenu
  })

  return (
    <Button {..._props} color="link">
      <Icon src={icon()} />
    </Button>
  )
}

export const NavbarBurger = Object.assign(NavbarBurger_, {
})
