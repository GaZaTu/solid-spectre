// css
import "./Button.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { ThemeSize } from "../util/theming"

type Props = {
  size?: ThemeSize
  round?: boolean
  block?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "btn-group": true,
        [`btn-group-${props.size}`]: !!props.size,
        "btn-group-round": !!props.round,
        "btn-group-block": props.block,
      })
    },
  }
})

function ButtonGroup_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      {fml.children}
    </div>
  )
}

export const ButtonGroup = Object.assign(ButtonGroup_, {
  createProps,
})
