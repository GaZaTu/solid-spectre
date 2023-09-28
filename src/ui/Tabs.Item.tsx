// css
import "./Tabs.css"
// js
import { ComponentProps, Show, createRenderEffect, createUniqueId, splitProps, useContext } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { TabsRadioGroup } from "./Tabs.RadioGroup"

type Props = {
  action?: boolean
  active?: boolean
  initial?: boolean
  panelId?: string
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "tabs-item": true,
        "tabs-action": props.action,
        "active": props.active,
      })
    },
  }
})

function TabsItem_(props: Props & ComponentProps<"li">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  const radioGroup = useContext(TabsRadioGroup)

  const defaultId = createUniqueId()
  const id = () => props.id ?? defaultId

  const active = () => radioGroup.exists() ? (radioGroup.activeId() === id()) : props.active

  const onclick = (e: MouseEvent) => {
    if (!radioGroup.exists()) {
      return
    }

    e.preventDefault()

    radioGroup.setActiveId(id())
  }

  createRenderEffect(() => {
    if (props.initial && !radioGroup.activeId()) {
      radioGroup.setActiveId(id())
    }
  })

  return (
    <Show when={!props.action} fallback={<li {..._props}>{fml.children}</li>}>
      <li {..._props} id={id()} onclick={onclick} role="tab" aria-controls={props.panelId} aria-selected={active()}>
        {fml.children}
      </li>
    </Show>
  )
}

export const TabsItem = Object.assign(TabsItem_, {
  createProps,
})
