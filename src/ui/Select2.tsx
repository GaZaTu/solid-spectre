// css
import "../css/input-select.css"
import "./Select.css"
import "./Select2.css"
// js
import { ComponentProps, For, JSX, createMemo, createRenderEffect, createSignal, createUniqueId, splitProps, useContext } from "solid-js"
import { A } from "./A"
import { FormContext } from "./Form.Context"
import { FormGroupContext } from "./Form.Group.Context"
import { Menu } from "./Menu"
import { ModalPortal } from "./Modal.Portal"
import { Select } from "./Select"

type OptionProps<T> = {
  options: T[]
  stringifyOption: (option: T | undefined) => string
  renderOption: (option: T) => JSX.Element
  keyofOption: (option: T | undefined) => any
  selected?: T
  onselect?: (option: T) => unknown
}

type Props = Parameters<typeof Select.createProps>[0] & OptionProps<any> & {
  menuWidth?: string
}

function Select2_(props: Props & Omit<ComponentProps<"input">, "onselect" | "onSelect">) {
  const [fml, __props] = splitProps(props, ["onselect"])
  const [_props] = Select.createProps(__props)

  const state = {
    inputRef: undefined as HTMLInputElement | undefined,
    closeMenu: undefined as (() => void) | undefined,
  }

  const form = useContext(FormContext)

  const formGroup = useContext(FormGroupContext)
  createRenderEffect(() => {
    if (_props.id) {
      formGroup.setInputId(_props.id)
    }
    if (_props.name) {
      formGroup.setInputName(_props.name)
    }
  })

  const selected = createMemo(() => {
    if (_props.selected !== undefined) {
      return _props.selected
    }

    if (!_props.name) {
      return undefined
    }

    const selected = form.getValue(_props.name) ?? ""
    return selected
  })

  const handleSelect = (option: any) => {
    console.log("handleSelect", option)

    void (fml.onselect as any)?.(option)

    if (!_props.name) {
      return
    }

    form.setValue(_props.name, option)
  }

  const menuId = createUniqueId()

  const [focusedOptionIndex, setFocusedOptionIndex] = createSignal(-1)
  createRenderEffect(() => {
    void _props.options

    setFocusedOptionIndex(-1)
  })

  const handleFocus: ComponentProps<"input">["onfocus"] = event => {
    void (_props.onfocus as any)?.(event)

    if (state.closeMenu) {
      return
    }

    ModalPortal.push(props => {
      state.closeMenu = props.resolve

      const input = state.inputRef!

      const maxHeight = 250

      const openAbove = (() => {
        const bodyRect = document.body.getBoundingClientRect()
        const inputRect = input.getBoundingClientRect()

        return (inputRect.bottom + maxHeight) > bodyRect.height
      })()

      const left = input.offsetLeft
      const top = input.offsetTop + input.offsetHeight
      const width = input.offsetWidth
      const bottom = (input.offsetParent?.clientHeight ?? 0) - input.offsetTop

      return (
        <Menu id={menuId} style={{ "position": "absolute", "left": `${left}px`, ...(openAbove ? { "bottom": `${bottom}px` } : { "top": `${top}px` }), "width": _props.menuWidth ? _props.menuWidth : `${width}px`, "max-height": `${maxHeight}px`, "overflow-y": "auto" }} role="listbox">
          <For each={_props.options}>
            {(option, index) => (
              <Menu.Item id={`${menuId}-${index()}`} onmousedown={() => handleSelect(option)} active={_props.keyofOption(option) === _props.keyofOption(selected())} focused={index() === focusedOptionIndex()} role="option">
                <A>{_props.renderOption(option)}</A>
              </Menu.Item>
            )}
          </For>
        </Menu>
      )
    })
  }

  const handleBlur: ComponentProps<"input">["onblur"] = event => {
    void (_props.onblur as any)?.(event)

    state.closeMenu?.()
    state.closeMenu = undefined

    setFocusedOptionIndex(-1)

    if (!_props.name) {
      return
    }

    form.setTouched(_props.name, true)
  }

  const handleKeyDown: ComponentProps<"input">["onkeydown"] = event => {
    switch (event.key) {
      case "Escape": {
        state.inputRef?.blur()
        break
      }

      case "Enter": {
        if (focusedOptionIndex() >= 0) {
          handleSelect(_props.options[focusedOptionIndex()])
        }
        break
      }

      case "ArrowUp": {
        const index = setFocusedOptionIndex(i => Math.max(i - 1, 0))
        document.getElementById(`${menuId}-${index}`)?.scrollIntoView({ block: "nearest" })
        break
      }

      case "ArrowDown": {
        const index = setFocusedOptionIndex(i => Math.min(i + 1, _props.options.length - 1))
        document.getElementById(`${menuId}-${index}`)?.scrollIntoView({ block: "nearest" })
        break
      }
    }
  }

  return (
    <input {..._props} ref={e => state.inputRef = e} value={_props.stringifyOption(selected())} onfocus={handleFocus} onblur={handleBlur} onkeydown={handleKeyDown} readonly role="combobox"
      aria-controls={menuId}
      aria-autocomplete="list"
      aria-expanded={!!state.closeMenu}
      aria-activedescendant={`${menuId}-${_props.options?.findIndex(option => _props.keyofOption(option) === _props.keyofOption(selected()))}`}
    />
  )
}

export const Select2 = Object.assign(Select2_, {
  createProps: Select.createProps,
  createOptionProps: function <T>(props: OptionProps<T>) {
    return props
  },
})
