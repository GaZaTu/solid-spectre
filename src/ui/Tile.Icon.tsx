// css
import "./Tile.css"
// js
import { ComponentProps, Show, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { Icon } from "./Icon"

type Props = {
  iconSrc?: ComponentProps<typeof Icon>["src"]
  iconSize?: ComponentProps<typeof Icon>["size"]
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "tile-icon": true,
      })
    },
  }
})

function TileIcon_(props: Props & ComponentProps<"section">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <section {..._props}>
      <Show when={props.iconSrc}>
        <div class="tile-icon-box">
          <Icon src={props.iconSrc} size={props.iconSize} />
        </div>
      </Show>
      {fml.children}
    </section>
  )
}

export const TileIcon = Object.assign(TileIcon_, {
  createProps,
})
