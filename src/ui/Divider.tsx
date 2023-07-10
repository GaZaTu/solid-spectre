import { classnames } from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import "./Divider.css"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { text } from "../util/text"

type Props = {
  vertical?: boolean
  textCenter?: boolean

  label?: string
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "divider": !props.vertical,
        "divider-vert": props.vertical,
        ...text(props.textCenter ? "center" : undefined),
      })
    },
  }
})

function Divider_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props} data-content={props.label}>
      {fml.children}
    </div>
  )
}

export const Divider = Object.assign(Divider_, {
  createProps,
})
