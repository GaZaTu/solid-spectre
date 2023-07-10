import classnames from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import CardBody from "./Card.Body"
import CardFooter from "./Card.Footer"
import CardHeader from "./Card.Header"
import CardImage from "./Card.Image"
import "./Card.css"
import createHTMLMemoHook from "../util/createHTMLMemoHook"

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

function Card(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      {fml.children}
    </div>
  )
}

export default Object.assign(Card, {
  createProps,
  Body: CardBody,
  Header: CardHeader,
  Footer: CardFooter,
  Image: CardImage,
})
