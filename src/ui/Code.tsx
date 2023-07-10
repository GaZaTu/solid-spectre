import { classnames } from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import "./Code.css"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
  snippet?: boolean

  lang?: string
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "code": props.snippet,
      })
    },
  }
})

function Code_(props: Props & ComponentProps<"code" | "pre">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <Dynamic component={_props.snippet ? "pre" : "code"} {..._props} data-lang={_props.lang}>
      {fml.children}
    </Dynamic>
  )
}

export const Code = Object.assign(Code_, {
  createProps,
})
