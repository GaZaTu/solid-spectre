// css
import "./Tabs.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
  hasAction?: boolean
  active?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "tabs-item": true,
        "tabs-action": props.hasAction,
        "active": props.active,
      })
    },
  }
})

function TabsItem_(props: Props & ComponentProps<"li">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  // TODO: const radioGroup = useContext(TabsRadioGroup)
  // TODO: isDefault

  return (
    <li {..._props} role="tab" aria-selected="false" aria-controls="">
      {fml.children}
    </li>
  )
}

export const TabsItem = Object.assign(TabsItem_, {
  createProps,
})
