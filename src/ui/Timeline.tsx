import { classnames } from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import { TimelineItem } from "./Timeline.Item"
import "./Timeline.css"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "timeline": true,
      })
    },
  }
})

function Timeline_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      {fml.children}
    </div>
  )
}

export const Timeline = Object.assign(Timeline_, {
  createProps,
  Item: TimelineItem,
})
