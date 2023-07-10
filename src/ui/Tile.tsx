import { classnames } from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import { TileAction } from "./Tile.Action"
import { TileBody } from "./Tile.Body"
import { TileIcon } from "./Tile.Icon"
import "./Tile.css"
import { TileSubtitle } from "./Tile.Subtitle"
import { TileTitle } from "./Tile.Title"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

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
