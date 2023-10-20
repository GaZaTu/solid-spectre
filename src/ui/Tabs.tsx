// css
import "./Tabs.css"
// js
import { Accessor, ComponentProps, Setter, Show, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { TabsBody } from "./Tabs.Body"
import { TabsList } from "./Tabs.List"
import { TabsPanel } from "./Tabs.Panel"
import { TabsRadioGroup } from "./Tabs.RadioGroup"

type Props = {
  block?: boolean
  bottomNav?: boolean
  activeId?: Accessor<string | undefined>
  setActiveId?: Setter<string | undefined>
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
      <TabsRadioGroup.Provider activeId={props.activeId} setActiveId={props.setActiveId}>
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
