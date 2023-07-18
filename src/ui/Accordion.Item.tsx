// css
import "./Accordion.css"
// js
import { ComponentProps, JSX, Show, createUniqueId, splitProps, useContext } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { marginR } from "../util/position"
import { AccordionRadioGroup } from "./Accordion.RadioGroup"
import { Icon } from "./Icon"

type Props = {
  header?: JSX.Element
  headerIcon?: boolean
  headerIconFloatRight?: boolean
  padded?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "accordion-item": true,
        "padded": !!props.padded,
      })
    },
  }
})

function AccordionItem_(props: Props & ComponentProps<"details">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  const radioGroup = useContext(AccordionRadioGroup)

  const defaultId = createUniqueId()
  const id = () => props.id ?? defaultId

  const open = () => radioGroup.exists() ? (radioGroup.activeId() === id()) : props.open

  const onclick = (e: MouseEvent) => {
    if (!radioGroup.exists()) {
      return
    }

    e.preventDefault()

    radioGroup.setActiveId(open() ? undefined : id())
  }

  return (
    <details {..._props} id={id()} open={open()}>
      <summary class="accordion-header" onclick={onclick}>
        <Show when={props.headerIcon}>
          <Icon src={Icon.Context.iconArrowDown} class={`accordion-icon-open ${marginR(1)}`} style={{ clear: "right", float: props.headerIconFloatRight ? "right" : undefined }} />
          <Icon src={Icon.Context.iconArrowUp} class={`accordion-icon-closed ${marginR(1)}`} style={{ clear: "right", float: props.headerIconFloatRight ? "right" : undefined }} />
        </Show>
        <span>{props.header}</span>
      </summary>
      <div class="accordion-body">
        {fml.children}
      </div>
    </details>
  )
}

export const AccordionItem = Object.assign(AccordionItem_, {
  createProps,
})
