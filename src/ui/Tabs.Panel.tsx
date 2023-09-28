// css
import "./Tabs.css"
// js
import { ComponentProps, JSX, Show, createUniqueId, splitProps, useContext } from "solid-js"
import { Portal } from "solid-js/web"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { TabsItem } from "./Tabs.Item"
import { TabsRadioGroup } from "./Tabs.RadioGroup"

type Props = {
  action?: boolean
  active?: boolean
  initial?: boolean
  header?: JSX.Element
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
      })
    },
  }
})

function TabsPanel_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children", "header"])
  const [_props] = createProps(props)

  const radioGroup = useContext(TabsRadioGroup)

  const defaultId = createUniqueId()
  const id = () => props.id ?? defaultId
  const panelId = () => `${id()}-panel`

  const active = () => radioGroup.exists() ? (radioGroup.activeId() === id()) : props.active

  return (
    <>
      <TabsItem id={id()} panelId={panelId()} active={active()} action={props.action} initial={props.initial}>
        {fml.header}
      </TabsItem>

      <Portal mount={radioGroup.bodyNode()}>
        <Show when={active()}>
          <div {..._props} id={panelId()} role="tabpanel" aria-labelledby={id()}>
            {fml.children}
          </div>
        </Show>
      </Portal>
    </>
  )
}

export const TabsPanel = Object.assign(TabsPanel_, {
  createProps,
})
