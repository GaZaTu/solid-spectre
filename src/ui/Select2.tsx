// css
import "../css/input-select.css"
import "./Select.css"
import "./Select2.css"
// js
import { ComponentProps, For, JSX } from "solid-js"
import { A } from "./A"
import { Menu } from "./Menu"
import { ModalPortal } from "./Modal.Portal"
import { Select } from "./Select"

type Props = Parameters<typeof Select.createProps>[0] & {
  options: any[]
  renderOption: (option: any) => JSX.Element
  stringifyOption: (option: any) => string
  selected: any
  onselect: (option: any) => unknown
}

function Select2_(props: Props & ComponentProps<"input">) {
  const [_props] = Select.createProps(props)

  const state = {
    inputRef: undefined as HTMLInputElement | undefined,
    closeMenu: () => undefined as void,
  }

  const onfocus: ComponentProps<"input">["onfocus"] = event => {
    void (_props.onfocus as any)?.(event)

    ModalPortal.push(props => {
      state.closeMenu = props.resolve

      const input = state.inputRef!

      const left = input.offsetLeft
      const top = input.offsetTop + input.offsetHeight
      const width = input.offsetWidth

      return (
        <Menu style={{ "position": "absolute", "left": `${left}px`, "top": `${top}px`, "width": `${width}px`, "max-height": "10rem", "overflow-y": "auto" }}>
          <For each={_props.options}>
            {option => (
              <Menu.Item onmousedown={() => _props.onselect(option)} active={option === _props.selected}>
                <A>{_props.renderOption(option)}</A>
              </Menu.Item>
            )}
          </For>
        </Menu>
      )
    })
  }

  const onblur: ComponentProps<"input">["onblur"] = event => {
    void (_props.onblur as any)?.(event)

    state.closeMenu()
  }

  return (
    <input {..._props} ref={e => state.inputRef = e} value={_props.selected ? _props.stringifyOption(_props.selected) : ""} onfocus={onfocus} onblur={onblur} readonly />
  )
}

export const Select2 = Object.assign(Select2_, {
  createProps: Select.createProps,
})
