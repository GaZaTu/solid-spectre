// css
import "./Figure.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { FigureCaption } from "./Figure.Caption"

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
