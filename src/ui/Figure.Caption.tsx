// css
import "./Img.css"
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
        "figure-caption": true,
      })
    },
  }
})

function FigureCaption_(props: Props & ComponentProps<"figcaption">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <figcaption {..._props}>
      {fml.children}
    </figcaption>
  )
}

export const FigureCaption = Object.assign(FigureCaption_, {
  createProps,
})
