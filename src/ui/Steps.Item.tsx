// css
import "./Steps.css"
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
        "steps-item": true,
        "active": props.active,
      })
    },
  }
})

function StepsItem_(props: Props & ComponentProps<"li">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <li {..._props}>
      {fml.children}
    </li>
  )
}

export const StepsItem = Object.assign(StepsItem_, {
  createProps,
})
