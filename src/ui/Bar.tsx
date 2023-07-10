import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { BarSection } from "./Bar.Section"
// css
import "./Bar.css"

// TODO: https://picturepan2.github.io/spectre/components/bars.html#bars-slider

type Props = {
  slider?: boolean
  size?: "sm" | "lg"
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "bar": true,
        "bar-slider": props.slider,
        [`bar-${props.size}`]: !!props.size,
      })
    },
  }
})

function Bar_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      {fml.children}
    </div>
  )
}

export const Bar = Object.assign(Bar_, {
  createProps,
  Section: BarSection,
})
