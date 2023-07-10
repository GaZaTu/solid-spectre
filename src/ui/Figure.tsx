import { classnames } from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import { FigureCaption } from "./Figure.Caption"
import "./Img.css"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "figure": true,
      })
    },
  }
})

function Figure_(props: Props & ComponentProps<"figure">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <figure {..._props}>
      {fml.children}
    </figure>
  )
}

export const Figure = Object.assign(Figure_, {
  createProps,
  Caption: FigureCaption,
})
