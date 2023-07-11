// css
import "./Img.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
  responsive?: boolean
  fit?: "contain" | "cover"
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "img-responsive": props.responsive,
        [`img-fit-${props.fit}`]: !!props.fit,
      })
    },
  }
})

function Img_(props: Props & ComponentProps<"img">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <img {..._props}>
      {fml.children}
    </img>
  )
}

export const Img = Object.assign(Img_, {
  createProps,
})
