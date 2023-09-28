// css
import "./Input.Group.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { ThemeSize } from "../util/theming"
import { InputGroupAddon } from "./Input.Group.Addon"

type Props = {
  size?: ThemeSize
  inline?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "input-group": true,
        [`input-group-${props.size}`]: !!props.size,
        "input-inline": props.inline,
      })
    },
  }
})

function InputGroup_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      {fml.children}
    </div>
  )
}

export const InputGroup = Object.assign(InputGroup_, {
  createProps,
  Addon: InputGroupAddon,
})
