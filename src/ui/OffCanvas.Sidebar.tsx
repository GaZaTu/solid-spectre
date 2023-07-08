import classnames from "classnames"
import { ComponentProps, JSX, Show, createUniqueId, splitProps } from "solid-js"
import Button from "./Button"
import Column from "./Column"
import Icon from "./Icon"
import "./OffCanvas.css"
import Section from "./Section"
import createHTMLMemoHook from "../util/createHTMLMemoHook"

type Props = {
  right?: boolean
  toggle?: JSX.Element
  sidebarTitle?: JSX.Element
  contentTitle?: JSX.Element
  active?: boolean

  checkboxId?: string
  withoutToggle?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "off-canvas-sidebar": true,
        "right": props.right,
        "active": props.active,
      })
    },
  }
})

function OffCanvasSidebar(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children", "toggle", "sidebarTitle", "contentTitle"])
  const [_props] = createProps(props)
  const id = createUniqueId()

  return (
    <>
      <input type="checkbox" class="off-canvas-checkbox" id={_props.checkboxId ?? id} />
      <div class={`off-canvas-toggle-container ${fml.contentTitle ? "has-title" : ""}`}>
        <Section size="xl">
          <Column.Row>
            <Show when={!_props.withoutToggle}>
              <Column class="off-canvas-toggle-column" xxl="auto">
                <Button.Label class="off-canvas-toggle" for={_props.checkboxId ?? id}>
                  <Show when={fml.toggle} fallback={<Icon src={Icon.Context.iconMenu} />}>
                    {fml.toggle}
                  </Show>
                </Button.Label>
              </Column>
            </Show>

            <Column class="off-canvas-content-title-column">
              {fml.contentTitle}
            </Column>
          </Column.Row>
        </Section>
      </div>
      <div {..._props}>
        {fml.sidebarTitle}
        {fml.children}
      </div>
      <label class="off-canvas-overlay" for={id} />
    </>
  )
}

export default Object.assign(OffCanvasSidebar, {
  createProps,
})
