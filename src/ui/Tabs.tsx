import { classnames } from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import { TabsItem } from "./Tabs.Item"
import { TabsRadioGroup } from "./Tabs.RadioGroup"
import "./Tabs.css"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "tabs": true,
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
  Item: TabsItem,
  RadioGroup: TabsRadioGroup,
})
