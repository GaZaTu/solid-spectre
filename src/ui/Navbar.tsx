// css
import "./Navbar.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { NavbarBrand } from "./Navbar.Brand"
import { NavbarBurger } from "./Navbar.Burger"
import { NavbarDropdown } from "./Navbar.Dropdown"
import { NavbarSection } from "./Navbar.Section"

type Props = {
  size?: "sm" | "lg"
  filled?: boolean
  padded?: boolean
  responsive?: boolean
  expanded?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "navbar": true,
        [`navbar-${props.size}`]: !!props.size,
        "navbar-filled": props.filled,
        "navbar-padded": props.padded,
        "navbar-responsive": props.responsive,
        "navbar-expanded": props.expanded,
      })
    },
  }
})

function Navbar_(props: Props & ComponentProps<"header">) {
  // const [context, setContext] = createStore({
  //   expanded: false,
  // })

  // const setExpanded: Setter<boolean> = v => {
  //   setContext(context => ({
  //     ...context,
  //     expanded: (() => {
  //       if (typeof v === "function") {
  //         return v(context.expanded)
  //       } else {
  //         return v
  //       }
  //     })(),
  //   }))

  //   return undefined as any
  // }

  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <header {..._props}>
      {/* <NavbarContext.Provider value={{ expanded: () => context.expanded, setExpanded }}> */}
        {fml.children}
      {/* </NavbarContext.Provider> */}
    </header>
  )
}

function NavbarFooter_(props: Props & ComponentProps<"footer">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <footer {..._props}>
      {fml.children}
    </footer>
  )
}

export const Navbar = Object.assign(Navbar_, {
  createProps,
  AsFooter: NavbarFooter_,
  Section: NavbarSection,
  Brand: NavbarBrand,
  Dropdown: NavbarDropdown,
  Burger: NavbarBurger,
})
