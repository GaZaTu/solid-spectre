// css
import "./LoadingPlaceholder.css"
// js
import { ComponentProps, Show, createRenderEffect, createSignal, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { Icon } from "./Icon"
import { Img } from "./Img"
import { LoadingPlaceholder } from "./LoadingPlaceholder"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
      })
    },
  }
})

function LoadingPlaceholderImg_(props: Props & ComponentProps<typeof Img>) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  const [loaded, setLoaded] = createSignal(false)
  createRenderEffect(() => {
    void props.src

    setLoaded(false)
  })

  const onload: (typeof props.onload) = ev => {
    void (props.onload as any)?.(ev)

    setLoaded(true)
  }

  return (
    <>
      <Show when={!loaded()}>
        <LoadingPlaceholder class={_props.class} style={_props.style} width={_props.width} height={_props.height} absolute>
          <Icon src={Icon.Context.iconPhoto} />
        </LoadingPlaceholder>
      </Show>
      <Img {..._props} onload={onload} />
      {fml.children}
    </>
  )
}

export const LoadingPlaceholderImg = Object.assign(LoadingPlaceholderImg_, {
  createProps,
})
