// css
import "./Hero.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { ThemeSize } from "../util/theming"

type Props = {
  size?: ThemeSize
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "hero": true,
        [`hero-${props.size}`]: !!props.size,
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
