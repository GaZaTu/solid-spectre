import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { ThemeSize2 } from "../util/theming"
// css
import "./Avatar.css"

type Props = {
  size?: ThemeSize2 | "btn"
  imageSrc?: string
  imageAlt?: string
  initials?: string
  iconImageSrc?: string
  iconImageAlt?: string
  presence?: "offline" | "online" | "busy" | "away"
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "avatar": true,
        [`avatar-${props.size}`]: !!props.size,
      })
    },
  }
})

function Avatar_(props: Props & ComponentProps<"figure">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <figure {..._props} data-initials={props.initials}>
      {fml.children}
      {props.imageSrc && (
        <img src={props.imageSrc} alt={props.imageAlt} />
      )}
      {props.iconImageSrc && (
        <img class="avatar-icon" src={props.imageSrc} alt={props.iconImageSrc} />
      )}
      {props.presence && (
        <i class={`avatar-presence ${props.presence}`} />
      )}
    </figure>
  )
}

export const Avatar = Object.assign(Avatar_, {
  createProps,
})
