// css
import "./LoadingPlaceholder.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
  inline?: boolean
  absolute?: boolean
  responsive?: boolean

  width?: string | number
  height?: string | number
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "loading-placeholder": true,
        "inline": props.inline,
        "absolute": props.absolute,
        "responsive": props.responsive,
      })
    },
  }
})

function LoadingPlaceholder_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children", "style"])
  const [_props] = createProps(props)

  return (
    <div {..._props} style={{
      ...(props.style as {}),
      ...(props.width ? {
        width: (typeof props.width === "number") ? `${props.width}px` : props.width,
      } : {}),
      ...(props.height ? {
        height: (typeof props.height === "number") ? `${props.height}px` : props.height,
      } : {}),
    }}>
      <div class="loading-placeholder-gradient">
        {fml.children}
      </div>
    </div>
  )
}

export const LoadingPlaceholder = Object.assign(LoadingPlaceholder_, {
  createProps,
})
