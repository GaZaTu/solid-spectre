// css
import "./ImgWithPlaceholder.css"
// js
import { createVisibilityObserver } from "@solid-primitives/intersection-observer"
import { ComponentProps, createEffect, createSignal, Show, splitProps } from "solid-js"
import { readFile } from "../util/readFile"
import { Icon } from "./Icon"
import { Img } from "./Img"
import { LoadingPlaceholder } from "./LoadingPlaceholder"

type Props = {
  useFetch?: boolean
}

function ImgWithPlaceholder_(_props: Props & ComponentProps<typeof Img>) {
  const [fml, props] = splitProps(_props, ["src", "useFetch"])

  const [placeholder, setPlaceholder] = createSignal<HTMLElement>()
  const useVisibilityObserver = createVisibilityObserver()
  const visible = useVisibilityObserver(placeholder)

  const [loading, setLoading] = createSignal(true)
  const [loaded, setLoaded] = createSignal(false)

  const [src, setSrc] = createSignal<string>()

  const SetLoaded = () => {
    setLoaded(true)
    return null
  }

  createEffect<{ src: string | undefined, cancelled: boolean }>(prevEffect => {
    const effect = {
      src: fml.src,
      cancelled: false,
    }

    if (prevEffect) {
      if (prevEffect.src === effect.src) {
        return prevEffect
      }

      prevEffect.cancelled = true
    }

    setLoading(true)
    setLoaded(false)

    if (!fml.src || (!visible() && !prevEffect?.cancelled)) {
      return effect
    }

    if (!fml.useFetch) {
      setSrc(fml.src)
      setLoading(false)
      setLoaded(true)
      return effect
    }

    void (async () => {
      const response = await fetch(fml.src!)
      if (effect.cancelled) {
        return
      }

      const blob = await response.blob()
      if (effect.cancelled) {
        return
      }

      const url = await readFile(blob, { how: "readAsDataURL" })
      if (effect.cancelled) {
        return
      }

      setSrc(url)
      setLoading(false)
    })()

    return effect
  })

  const onload = () => {
    if (fml.useFetch) {
      return
    }

    setLoading(false)
  }

  return (
    <>
      <div style={{ display: loaded() ? "flex" : "none" }}>
        <Img {...props} src={src()} onload={onload} style={props.style} />
      </div>

      <Show when={loading()} fallback={<SetLoaded />}>
        <LoadingPlaceholder ref={setPlaceholder} width={props.width} height={props.height} style2={props.style}>
          <Icon src={Icon.Context.iconPhoto} />
        </LoadingPlaceholder>
      </Show>
    </>
  )
}

export const ImgWithPlaceholder = Object.assign(ImgWithPlaceholder_, {
})
