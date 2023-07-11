// css
import "./Empty.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { Icon } from "./Icon"

type Props = {
  iconSrc?: ComponentProps<typeof Icon>["src"]
  iconSize?: ComponentProps<typeof Icon>["size"]
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "empty-icon": true,
      })
    },
  }
})

function EmptyIcon_(props: Props & ComponentProps<"section">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <section {..._props}>
      {props.iconSrc && (
        <Icon src={props.iconSrc} size={props.iconSize ?? "3x"} />
      )}
      {fml.children}
    </section>
  )
}

export const EmptyIcon = Object.assign(EmptyIcon_, {
  createProps,
})
