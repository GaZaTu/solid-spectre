import { ComponentProps, createEffect, For, JSX, Show, splitProps } from "solid-js"
import Button from "./Button"
import Code from "./Code"
import Icon from "./Icon"
import Toast from "./Toast"
import "./Toaster.css"
import { ToasterStore, useToaster } from "./Toaster.Store"
import { marginR } from "../util/position"

const notifications = new ToasterStore<Partial<ComponentProps<typeof ToastWithAnimation>>>()

const pushNotification = (props: Partial<ComponentProps<typeof ToastWithAnimation>>) => {
  return notifications.create({
    timeout: 15000,
    closable: true,
    ...props,
  })
}

const removeNotification = (id: string) => {
  notifications.remove(id)
}

const pushInfo = (message: any) => {
  pushNotification({
    color: undefined,
    children: (
      <>
        <Icon src={Icon.Context.iconInfo} class={`${marginR(2)}`} />
        <span>{String(message)}</span>
      </>
    ),
  })

  return undefined
}

const pushSuccess = (message: any) => {
  pushNotification({
    color: "success",
    children: (
      <>
        <Icon src={Icon.Context.iconCheckCircle} class={`${marginR(2)}`} />
        <span>{String(message)}</span>
      </>
    ),
  })

  return undefined
}

const pushWarning = (message: any) => {
  pushNotification({
    color: "warning",
    children: (
      <>
        <Icon src={Icon.Context.iconAlertTriangle} class={`${marginR(2)}`} />
        <span>{String(message)}</span>
      </>
    ),
  })

  return undefined
}

const pushError = (error: any, onclose?: (() => void) | unknown) => {
  console.error(error)

  if (error instanceof Error) {
    if ((import.meta as any)?.env?.PROD) {
      error = error?.message ?? String(error)
    } else {
      error = error ? `${error.name ?? "Error"}: ${error.message}\n\t${error.stack?.replaceAll("\n", "\n\t")}` : String(error)
    }
  } else {
    error = String(error)
  }

  error = (
    <>
      <Icon src={Icon.Context.iconAlertCircle} class={`${marginR(2)}`} />
      <Code snippet style={{ color: "initial" }}>{error}</Code>
    </>
  )

  pushNotification({
    color: "failure",
    children: error,
    onclose: (typeof onclose === "function") ? (onclose as any) : undefined,
  })

  return undefined
}

function tryFunc<R>(func: () => R): R {
  try {
    const maybePromise = func()

    if (maybePromise instanceof Promise) {
      return (async () => {
        try {
          return await maybePromise
        } catch (error) {
          pushError(error)
          throw error
        }
      })() as unknown as R
    }

    return maybePromise
  } catch (error) {
    pushError(error)
    throw error
  }
}

function Toaster(props: {}) {
  const notifs = useToaster(notifications)

  return (
    <div class="toaster">
      <For each={notifs()}>
        {item => (
          <ToastWithAnimation {...item.data} id={item.id} />
        )}
      </For>
    </div>
  )
}

export default Object.assign(Toaster, {
  notifications,
  push: pushNotification,
  remove: removeNotification,
  pushInfo,
  pushSuccess,
  pushWarning,
  pushError,
  try: tryFunc,
})

type ToastWithAnimationProps = {
  id: string
  closable?: boolean
  timeout?: number
  children?: JSX.Element
  onclose?: () => void
}

function ToastWithAnimation(props: ToastWithAnimationProps & ComponentProps<typeof Toast>) {
  const [localProps, toastProps] = splitProps(props, [
    "closable",
    "timeout",
    "children",
    "onclose",
  ])

  const dispose = () => {
    localProps.onclose?.()
    notifications.remove(toastProps.id)
  }

  createEffect(() => {
    if (!localProps.timeout) {
      return
    }

    setTimeout(dispose, localProps.timeout)
  })

  return (
    <Toast {...toastProps}>
      <Show when={localProps.closable}>
        <Button clear style={{ float: "right" }} onclick={dispose} />
      </Show>

      <Show when={(typeof localProps.children === "string")} fallback={localProps.children}>
        <p>{localProps.children}</p>
      </Show>
    </Toast>
  )
}
