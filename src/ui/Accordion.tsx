// css
import "./Accordion.css"
// js
import { ComponentProps, JSX, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { float, marginR } from "../util/position"
import { AccordionRadioGroup } from "./Accordion.RadioGroup"
import { Icon } from "./Icon"

type Props = {
  header?: JSX.Element
  headerIcon?: boolean
  headerIconFloatRight?: boolean
  // isDefault?: boolean
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

function Accordion_(props: Props & ComponentProps<"details">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  // const radioGroup = useContext(AccordionRadioGroup)
  // TODO: isDefault

  return (
    <details {..._props}>
      <summary class="accordion-header" style={{ "cursor": "pointer" }}>
        {props.headerIcon && (
          <Icon src={props.open ? Icon.Context.iconArrowDown : Icon.Context.iconArrowUp} classList={{ ...marginR(1), ...float(props.headerIconFloatRight ? "right" : undefined) }} />
        )}
        {props.header}
      </summary>
      <div class="accordion-body">
        {fml.children}
      </div>
    </details>
  )
}

export const Accordion = Object.assign(Accordion_, {
  createProps,
  RadioGroup: AccordionRadioGroup,
})
