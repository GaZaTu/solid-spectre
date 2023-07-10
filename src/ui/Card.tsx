import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { CardBody } from "./Card.Body"
import { CardFooter } from "./Card.Footer"
import { CardHeader } from "./Card.Header"
import { CardImage } from "./Card.Image"
// css
import "./Card.css"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "card": true,
      })
    },
  }
})

function Card_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      {fml.children}
    </div>
  )
}

export const Card = Object.assign(Card_, {
  createProps,
  Body: CardBody,
  Header: CardHeader,
  Footer: CardFooter,
  Image: CardImage,
})
