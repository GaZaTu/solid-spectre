import { classnames } from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import "./Modal.css"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "modal-body": true,
      })
    },
  }
})

function ModalBody_(props: Props & ComponentProps<"section">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <section {..._props}>
      {fml.children}
    </section>
  )
}

export const ModalBody = Object.assign(ModalBody_, {
  createProps,
})
