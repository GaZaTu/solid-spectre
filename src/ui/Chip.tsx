// css
import "./Chip.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
  active?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "chip": true,
        "active": props.active,
      })
    },
  }
})

function Chip_(props: Props & ComponentProps<"span">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <span {..._props}>
      {fml.children}
    </span>
  )
}

export const Chip = Object.assign(Chip_, {
  createProps,
})
