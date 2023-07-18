// css
import "./Accordion.css"
// js
import { ComponentProps, Show, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { AccordionItem } from "./Accordion.Item"
import { AccordionRadioGroup } from "./Accordion.RadioGroup"

type Props = {
  multiple?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "accordion": true,
      })
    },
  }
})

function Accordion_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      <Show when={!props.multiple} fallback={fml.children}>
        <AccordionRadioGroup.Provider>
          {fml.children}
        </AccordionRadioGroup.Provider>
      </Show>
    </div>
  )
}

export const Accordion = Object.assign(Accordion_, {
  createProps,
  Item: AccordionItem,
  RadioGroup: AccordionRadioGroup,
})
