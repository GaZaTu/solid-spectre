import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
// css
import "./Card.css"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "card-body": true,
      })
    },
  }
})

function CardBody_(props: Props & ComponentProps<"section">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <section {..._props}>
      {fml.children}
    </section>
  )
}

export const CardBody = Object.assign(CardBody_, {
  createProps,
})
