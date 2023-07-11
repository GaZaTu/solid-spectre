// css
import "./Button.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { loading } from "../util/loading"
import { ThemeColor, ThemeSize } from "../util/theming"
import { A } from "./A"
import { ButtonGroup } from "./Button.Group"

type Props = {
  size?: ThemeSize
  color?: ThemeColor | "transparent"
  round?: boolean
  circle?: boolean
  action?: boolean
  block?: boolean
  clear?: boolean
  outlined?: boolean
  active?: boolean
  loading?: boolean
  disabled?: boolean

  type?: "button" | "submit" | "reset"
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get type() {
      return props.type ?? "button"
    },
    get class() {
      return classnames({
        "btn": true,
        [`btn-${props.size}`]: !!props.size,
        [`btn-${props.color}`]: !!props.color,
        "btn-round": props.round,
        "btn-circle": props.circle,
        "btn-action": props.action,
        "btn-block": props.block,
        "btn-clear": props.clear,
        "btn-outlined": props.outlined,
        "btn-active": props.active,
        "disabled": props.disabled,
        ...loading(props.loading ? "sm" : undefined),
      })
    },
  }
})

function Button_(props: Props & ComponentProps<"button">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <button {..._props}>
      {fml.children}
    </button>
  )
}

function ButtonAnchor_(props: Props & ComponentProps<typeof A>) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props, { color: "link" })

  return (
    <A {..._props}>
      {fml.children}
    </A>
  )
}

function ButtonLabel_(props: Props & ComponentProps<"label">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <label {..._props}>
      {fml.children}
    </label>
  )
}

function ButtonFileInput_(props: Props & ComponentProps<"label"> & { onFilesChange: (files: FileList | null) => unknown, accept?: string, multiple?: boolean }) {
  const [fml] = splitProps(props, ["children", "id"])
  const [_props] = createProps(props)

  const id = fml.id
  const onchange: ComponentProps<"input">["onchange"] = (event) => {
    props.onFilesChange(event.currentTarget.files)
  }

  return (
    <>
      <input id={id} type="file" onchange={onchange} accept={props.accept} multiple={props.multiple} style={{ display: "none" }} />
      <label for={id} {..._props}>
        {fml.children}
      </label>
    </>
  )
}

export const Button = Object.assign(Button_, {
  createProps,
  Group: ButtonGroup,
  A: ButtonAnchor_,
  Label: ButtonLabel_,
  FileInput: ButtonFileInput_,
})
