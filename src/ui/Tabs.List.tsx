// css
import "./Tabs.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
  block?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "tabs": true,
        "tabs-block": props.block,
      })
    },
  }
})

function TabsList_(props: Props & ComponentProps<"ul">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <ul {..._props} role="tablist">
      {fml.children}
    </ul>
  )
}

export const TabsList = Object.assign(TabsList_, {
  createProps,
})
