// css
import "./Divider.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { text } from "../util/text"

type Props = {
  vertical?: boolean
  textCenter?: boolean
  fullwidth?: boolean

  label?: string
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "divider": !props.vertical,
        "divider-vert": props.vertical,
        "divider-fullwidth": props.fullwidth,
        ...text(props.textCenter ? "center" : undefined),
      })
    },
  }
})

function Divider_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props} data-content={props.label} role="separator">
      {fml.children}
    </div>
  )
}

export const Divider = Object.assign(Divider_, {
  createProps,
})
