// css
import "./Modal.css"
// js
import { ComponentProps, createUniqueId, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { ThemeSize } from "../util/theming"
import { A } from "./A"
import { ModalBody } from "./Modal.Body"
import { ModalContext } from "./Modal.Context"
import { ModalFooter } from "./Modal.Footer"
import { ModalHeader } from "./Modal.Header"

type Props = {
  size?: ThemeSize
  active?: boolean

  onclose?: ComponentProps<typeof A>["onclick"]
  oncloseHref?: ComponentProps<typeof A>["href"]
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "modal": true,
        [`modal-${props.size}`]: !!props.size,
        "active": props.active,
      })
    },
  }
})

function Modal_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)
  const [outerProps, innerProps] = splitProps(_props, ["class"])

  const defaultId = createUniqueId()

  const context = {
    id: () => props.id ?? defaultId,
    active: () => !!props.active,
    onclose: () => props.onclose,
    oncloseHref: () => props.oncloseHref,
  }

  return (
    <div {...outerProps} id={context.id()} role="dialog" aria-labelledby={`${context.id()}-label`}>
      <A class="modal-overlay" href={props.oncloseHref} onclick={props.onclose} />
      <div class="modal-container" {...innerProps}>
        <ModalContext.Provider value={context}>
          {fml.children}
        </ModalContext.Provider>
      </div>
    </div>
  )
}

export const Modal = Object.assign(Modal_, {
  createProps,
  Context: ModalContext,
  Body: ModalBody,
  Footer: ModalFooter,
  Header: ModalHeader,
})
