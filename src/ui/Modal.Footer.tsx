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
        "modal-footer": true,
      })
    },
  }
})

function ModalFooter_(props: Props & ComponentProps<"section">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <section {..._props}>
      {fml.children}
    </section>
  )
}

export const ModalFooter = Object.assign(ModalFooter_, {
  createProps,
})
