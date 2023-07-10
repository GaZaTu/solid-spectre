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
        "tile-body": true,
      })
    },
  }
})

function TileBody_(props: Props & ComponentProps<"section">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <section {..._props}>
      {fml.children}
    </section>
  )
}

export const TileBody = Object.assign(TileBody_, {
  createProps,
})
