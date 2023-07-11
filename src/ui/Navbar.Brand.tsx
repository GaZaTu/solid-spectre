// css
import "./Navbar.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "navbar-brand": true,
      })
    },
  }
})

function NavbarBrand_(props: Props & ComponentProps<"span">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  // const context = useContext(NavbarContext)

  return (
    <span {..._props}>
      {fml.children}

      {/* <NavbarBurger expanded={context.expanded()} onclick={() => {
        console.log("wtfrlick")
        context.setExpanded(p => !p)
      }} /> */}
    </span>
  )
}

export const NavbarBrand = Object.assign(NavbarBrand_, {
  createProps,
})
