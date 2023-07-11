// css
import "./SpectreIconProvider.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "./classnames"
import { createHTMLMemoHook } from "./createHTMLMemoHook"

type Props = ComponentProps<"i"> & {
  src?: string
  size?: string | "sm" | "md" | "lg" | "xl"
  color?: string
}

const convertSize = (size: Props["size"]) => {
  switch (size) {
  case "sm":
    return "1x"
  case "md":
    return "2x"
  case "lg":
    return "3x"
  case "xl":
    return "4x"
  default:
    return size
  }
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "spectre-icon": !!props.src,
        [props.src ?? ""]: true,
        [`icon-${convertSize(props.size)}`]: !!props.size,
      })
    },
    get style() {
      return {
        ...(props.style as {}),
        "color": props.color,
      }
    },
  }
})

function SpectreIconProvider_(props: Props) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <i {..._props}>
      {fml.children}
    </i>
  )
}

export const SpectreIconProvider = Object.assign(SpectreIconProvider_, {
  createProps,
  register: () => {
    // not implemented anymore
  },
})
