import { classnames } from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import { StepsItem } from "./Steps.Item"
import "./Steps.css"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "steps": true,
      })
    },
  }
})

function Steps_(props: Props & ComponentProps<"ul">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <ul {..._props}>
      {fml.children}
    </ul>
  )
}

export const Steps = Object.assign(Steps_, {
  createProps,
  Item: StepsItem,
})
