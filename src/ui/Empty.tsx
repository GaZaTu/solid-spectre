// css
import "./Empty.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { EmptyAction } from "./Empty.Action"
import { EmptyHeader } from "./Empty.Header"
import { EmptyIcon } from "./Empty.Icon"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "empty": true,
      })
    },
  }
})

function Empty_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      {fml.children}
    </div>
  )
}

export const Empty = Object.assign(Empty_, {
  createProps,
  Action: EmptyAction,
  Header: EmptyHeader,
  Icon: EmptyIcon,
})
