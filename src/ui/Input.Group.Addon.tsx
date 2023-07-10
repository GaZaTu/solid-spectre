import { classnames } from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import "./Input.Group.css"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { ThemeSize } from "../util/theming"

type Props = {
  size?: ThemeSize
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "input-group-addon": true,
        [`addon-${props.size}`]: !!props.size,
      })
    },
  }
})

function InputGroupAddon_(props: Props & ComponentProps<"span">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <span {..._props}>
      {fml.children}
    </span>
  )
}

export const InputGroupAddon = Object.assign(InputGroupAddon_, {
  createProps,
})
