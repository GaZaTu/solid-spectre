// css
import "./Tile.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { TileAction } from "./Tile.Action"
import { TileBody } from "./Tile.Body"
import { TileIcon } from "./Tile.Icon"
import { TileSubtitle } from "./Tile.Subtitle"
import { TileTitle } from "./Tile.Title"

type Props = {
  compact?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "tile": true,
        "tile-centered": props.compact,
      })
    },
  }
})

function Tile_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      {fml.children}
    </div>
  )
}

export const Tile = Object.assign(Tile_, {
  createProps,
  Action: TileAction,
  Body: TileBody,
  Icon: TileIcon,
  Subtitle: TileSubtitle,
  Title: TileTitle,
})
