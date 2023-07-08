import classnames from "classnames"
import { ComponentProps, splitProps } from "solid-js"
import "./Section.css"
import createHTMLMemoHook from "./util/createHTMLMemoHook"
import { createUtility, ThemeBreakpoint } from "./util/theming"

type Props = {
  left?: boolean
  size?: ThemeBreakpoint
  marginY?: boolean
  flex?: boolean
  grow?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "container": true,
        "container-left": props.left,
        [`grid-${props.size}`]: !!props.size,
        "container-with-y-margin": props.marginY,
        "container-flex": props.flex,
        "container-grow": props.grow,
      })
    },
  }
})

function Section(props: Props & ComponentProps<"section">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <section {..._props}>
      {fml.children}
    </section>
  )
}

export default Object.assign(Section, {
  createProps,
})

export const hide = createUtility((breakpoint: ThemeBreakpoint | undefined) => {
  return breakpoint ? `hide-${breakpoint}` : undefined
})

export const show = createUtility((breakpoint: ThemeBreakpoint | undefined) => {
  return breakpoint ? `show-${breakpoint}` : undefined
})
