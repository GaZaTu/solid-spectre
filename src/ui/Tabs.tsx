// css
import "./Tabs.css"
// js
import { ComponentProps, Show, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { TabsPanel } from "./Tabs.Panel"
import { TabsRadioGroup } from "./Tabs.RadioGroup"
import { TabsList } from "./Tabs.List"
import { TabsBody } from "./Tabs.Body"

type Props = {
  block?: boolean
  bottomNav?: boolean
  useSearchParam?: boolean | string
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "tabs-container": true,
      })
    },
  }
})

function Tabs_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      <TabsRadioGroup.Provider useSearchParam={props.useSearchParam}>
        <Show when={props.bottomNav}>
          <TabsBody />
        </Show>

        <TabsList block={props.block}>
          {fml.children}
        </TabsList>

        <Show when={!props.bottomNav}>
          <TabsBody />
        </Show>
      </TabsRadioGroup.Provider>
    </div>
  )
}

export const Tabs = Object.assign(Tabs_, {
  createProps,
  Panel: TabsPanel,
})
