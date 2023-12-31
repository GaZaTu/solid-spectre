// css
import "./Timeline.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { TimelineItem } from "./Timeline.Item"

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

function Timeline_(props: Props & ComponentProps<"section">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <section role="feed" {..._props}>
      {fml.children}
    </section>
  )
}

export const Timeline = Object.assign(Timeline_, {
  createProps,
  Item: TimelineItem,
})
