// css
import "./Carousel.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { Button } from "./Button"
import { Icon } from "./Icon"

type Props = {
  prev?: boolean
  next?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "item-prev": props.prev,
        "item-next": props.next,
      })
    },
  }
})

function CarouselButton_(props: Props & ComponentProps<typeof Button>) {
  // eslint-disable-next-line no-empty-pattern
  const [] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <Button size="lg" action {..._props}>
      <Icon src={_props.prev ? Icon.Context.iconArrowLeft : Icon.Context.iconArrowRight} />
    </Button>
  )
}

function CarouselButtonA_(props: Props & ComponentProps<typeof Button.A>) {
  // eslint-disable-next-line no-empty-pattern
  const [] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <Button.A size="lg" action {..._props}>
      <Icon src={_props.prev ? Icon.Context.iconArrowLeft : Icon.Context.iconArrowRight} />
    </Button.A>
  )
}

export const CarouselButton = Object.assign(CarouselButton_, {
  createProps,
  A: CarouselButtonA_,
})
