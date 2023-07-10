import { classnames } from "../util/classnames"
import { ComponentProps, JSX, splitProps } from "solid-js"
import { A_ } from "./A"
import "./Timeline.css"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
  icon?: JSX.Element
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "timeline-item": true,
      })
    },
  }
})

function TimelineItem_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      <div class="timeline-left">
        <A_ class="timeline-icon" href={_props.id ? `#${_props.id}` : undefined}>
          {_props.icon ?? ""}
        </A_>
      </div>
      <div class="timeline-content">
        {fml.children}
      </div>
    </div>
  )
}

export const TimelineItem = Object.assign(TimelineItem_, {
  createProps,
})
