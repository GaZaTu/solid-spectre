// css
import "./Carousel.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { CarouselButton } from "./Carousel.Button"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "carousel": true,
      })
    },
  }
})

function Carousel_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      <div class="carousel-container">
        <figure class="carousel-item checked">
          {fml.children}
        </figure>
      </div>
    </div>
  )
}

export const Carousel = Object.assign(Carousel_, {
  createProps,
  Button: CarouselButton,
})
