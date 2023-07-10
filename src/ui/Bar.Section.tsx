import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { text } from "../util/text"
// CSS
import "./Bar.css"

type Props = {
  percent?: number
  value?: number
  max?: number
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "bar-section": true,
        ...text("ellipsis"),
      })
    },
  }
})

function BarSection_(props: Props & ComponentProps<"span">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <span
      {..._props}
      style={(() => {
        const percent = props.percent ?? Math.floor((props.max ?? 1) / (props.value ?? 1))

        if (typeof props.style === "string") {
          return `${props.style} width: ${percent}%;`
        } else {
          return {
            ...props.style,
            width: `${percent}%`,
          }
        }
      })()}
      aria-valuenow={props.value}
      aria-valuemin={0}
      aria-valuemax={props.max}>
      {fml.children}
    </span>
  )
}

export const BarSection = Object.assign(BarSection_, {
  createProps,
})
