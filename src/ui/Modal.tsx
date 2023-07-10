import { classnames } from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import { A_ } from "./A"
import { ModalBody } from "./Modal.Body"
import { ModalContext } from "./Modal.Context"
import { ModalFooter } from "./Modal.Footer"
import { ModalHeader } from "./Modal.Header"
import "./Modal.css"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { ThemeSize } from "../util/theming"

type Props = {
  size?: ThemeSize
  active?: boolean

  onclose?: ComponentProps<typeof A_>["onclick"]
  oncloseHref?: ComponentProps<typeof A_>["href"]
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

  const context = {
    active: () => !!props.active,
    onclose: () => props.onclose,
    oncloseHref: () => props.oncloseHref,
  }

  return (
    <div {...outerProps}>
      <A_ class="modal-overlay" href={props.oncloseHref} onclick={props.onclose} />
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
