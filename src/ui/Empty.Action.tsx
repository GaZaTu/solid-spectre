import { classnames } from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import "./Empty.css"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "empty-action": true,
      })
    },
  }
})

function EmptyAction_(props: Props & ComponentProps<"section">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <section {..._props}>
      {fml.children}
    </section>
  )
}

export const EmptyAction = Object.assign(EmptyAction_, {
  createProps,
})
