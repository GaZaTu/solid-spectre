// css
import "./NoScript.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "noscript": true,
      })
    },
  }
})

function NoScript_(props: Props & ComponentProps<"noscript">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <noscript {..._props}>
      {fml.children}
    </noscript>
  )
}

export const NoScript = Object.assign(NoScript_, {
  createProps,
})
