// css
import "./Tile.css"
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
        "tile-subtitle": true,
      })
    },
  }
})

function TileSubtitle_(props: Props & ComponentProps<"p">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <p {..._props}>
      {fml.children}
    </p>
  )
}

export const TileSubtitle = Object.assign(TileSubtitle_, {
  createProps,
})
