import { Accessor, createEffect, onCleanup } from "solid-js"
import { createStore } from "solid-js/store"
import { isServer } from "solid-js/web"
import { Progress } from "./Progress"

const globalProgressStateDefaults = {
  visible: isServer as boolean,
  value: undefined as number | undefined,
  max: undefined as number | undefined,
}

const [globalProgressState, setGlobalProgressState] = createStore({ ...globalProgressStateDefaults })
const createGlobalProgressStateEffect = (getVisible: Accessor<boolean>) => {
  createEffect(() => {
    const visible = getVisible()

    setGlobalProgressState(state => ({
      ...state,
      visible,
    }))
  })

  onCleanup(() => {
    setGlobalProgressState({ ...globalProgressStateDefaults })
  })
}

async function loadWithGlobalProgress<T>(promise: Promise<T> | (() => Promise<T>)) {
  setGlobalProgressState({
    value: 0,
    max: undefined,
    visible: true,
  })

  try {
    if (!(promise instanceof Promise)) {
      promise = promise()
    }

    return await promise
  } finally {
    setGlobalProgressState({
      value: undefined,
      max: undefined,
      visible: false,
    })
  }
}

export {
  createGlobalProgressStateEffect,
  globalProgressState,
  setGlobalProgressState,
  loadWithGlobalProgress,
}

function GlobalProgress_() {
  return (
    <Progress fixedTop value={globalProgressState.value} max={globalProgressState.max} style={{ display: globalProgressState.visible ? "block" : "none" }} />
  )
}

export const GlobalProgress = Object.assign(GlobalProgress_, {})
