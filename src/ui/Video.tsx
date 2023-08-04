// css
import "./Video.css"
// js
import { ComponentProps, Show, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
  media?: ComponentProps<"video">
  ratio?: "16:9" | "4:3" | "1:1"
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "video-responsive": true,
        "video-responsive-4-3": props.ratio === "4:3",
        "video-responsive-1-1": props.ratio === "1:1",
      })
    },
  }
})

function Video_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      <Show when={_props.media}>
        <video {..._props.media} />
      </Show>
      {fml.children}
    </div>
  )
}

export const Video = Object.assign(Video_, {
  createProps,
})
