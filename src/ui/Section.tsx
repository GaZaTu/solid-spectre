// css
import "./Section.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { ThemeBreakpoint, createUtility } from "../util/theming"

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

function Section_(props: Props & ComponentProps<"section">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <section {..._props}>
      {fml.children}
    </section>
  )
}

export const Section = Object.assign(Section_, {
  createProps,
})

export const hide = createUtility((breakpoint: ThemeBreakpoint | undefined) => {
  return breakpoint ? `hide-${breakpoint}` : undefined
})

export const show = createUtility((breakpoint: ThemeBreakpoint | undefined) => {
  return breakpoint ? `show-${breakpoint}` : undefined
})
