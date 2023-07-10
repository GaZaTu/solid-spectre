import { classnames } from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import "./Tile.css"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "tile-action": true,
      })
    },
  }
})

function TileAction_(props: Props & ComponentProps<"section">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <section {..._props}>
      {fml.children}
    </section>
  )
}

export const TileAction = Object.assign(TileAction_, {
  createProps,
})
