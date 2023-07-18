// css
import "./Timeline.css"
// js
import { ComponentProps, JSX, Show, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { A } from "./A"

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

function TimelineItem_(props: Props & ComponentProps<"article">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <article {..._props}>
      <div class="timeline-left">
        <A class="timeline-icon" href={_props.id ? `#${_props.id}` : undefined}>
          <Show when={_props.icon} fallback={""}>
            {_props.icon}
          </Show>
        </A>
      </div>
      <div class="timeline-content">
        {fml.children}
      </div>
    </article>
  )
}

export const TimelineItem = Object.assign(TimelineItem_, {
  createProps,
})
