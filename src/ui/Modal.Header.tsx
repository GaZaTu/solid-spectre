// css
import "./Modal.css"
// js
import { ComponentProps, splitProps, useContext } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { float } from "../util/position"
import { Button } from "./Button"
import { ModalContext } from "./Modal.Context"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "modal-header": true,
      })
    },
  }
})

function ModalHeader_(props: Props & ComponentProps<"section">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  const {
    id,
    oncloseHref,
    onclose,
  } = useContext(ModalContext)

  return (
    <section {..._props} id={`${id()}-label`}>
      <Button.A clear class={`${float("right")}`} href={oncloseHref()} onclick={onclose()} aria-label="Dismiss" />
      {fml.children}
    </section>
  )
}

export const ModalHeader = Object.assign(ModalHeader_, {
  createProps,
})
