import { classnames } from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import "./Hero.css"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "hero": true,
      })
    },
  }
})

function Hero_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      <div class="hero-body">
        {fml.children}
      </div>
    </div>
  )
}

export const Hero = Object.assign(Hero_, {
  createProps,
})
