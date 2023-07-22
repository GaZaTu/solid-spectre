// css
import "./Card.css"
// js
import { ComponentProps, Show, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { Img } from "./Img"

type Props = {
  src?: string
  alt?: string
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "card-image": true,
      })
    },
  }
})

function CardImage_(props: Props & ComponentProps<"section">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <section {..._props}>
      <Show when={props.src}>
        <Img src={props.src} alt={props.alt} responsive />
      </Show>
      {fml.children}
    </section>
  )
}

export const CardImage = Object.assign(CardImage_, {
  createProps,
})
