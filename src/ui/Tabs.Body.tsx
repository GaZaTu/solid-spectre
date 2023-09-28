// css
import "./Tabs.css"
// js
import { ComponentProps, splitProps, useContext } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { TabsRadioGroup } from "./Tabs.RadioGroup"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "tabs-body": true,
      })
    },
  }
})

function TabsBody_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  const radioGroup = useContext(TabsRadioGroup)

  return (
    <div {..._props} ref={radioGroup.setBodyNode}>
      {fml.children}
    </div>
  )
}

export const TabsBody = Object.assign(TabsBody_, {
  createProps,
})
