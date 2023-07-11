// css
import "./Form.css"
// js
import { createForm } from "@felte/solid"
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { FormContext } from "./Form.Context"
import { FormGroup } from "./Form.Group"

type Obj = Record<string, any>

type FormConfig<Data extends Obj = Obj, Ext extends Obj = Obj> = NonNullable<Parameters<typeof createForm<Data, Ext>>[0]> & {
  isRequired?: (name?: string) => boolean
}

const createContext = <Data extends Obj = Obj, Ext extends Obj = Obj>(config: FormConfig<Data, Ext>) => {
  const {
    isRequired,
    ...formConfig
  } = config

  return Object.assign(createForm(formConfig), {
    isRequired,
  })
}

type Props = {
  horizontal?: boolean
  context?: ReturnType<typeof createContext>
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "form": true,
      })
    },
  }
})

function Form_(props: Props & ComponentProps<"form">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props, {
    onKeyDown: ev => {
      if (ev.ctrlKey && ev.key === "Enter") {
        _props.context?.handleSubmit?.()
      }
    },
  })

  const form: ComponentProps<typeof FormContext.Provider>["value"] = {
    getValue: (name) => {
      return _props.context?.data(name)
    },
    getError: (name) => {
      return _props.context?.errors(name)?.[0]
    },
    setValue: (name, value) => {
      _props.context?.setFields(name, value)
    },
    setTouched: (name, touched) => {
      _props.context?.setTouched(name, touched)
    },
    isRequired: (name) => {
      return _props.context?.isRequired?.(name) ?? false
    },
    get horizontal() {
      return _props.horizontal ?? false
    },
  }

  return (
    <form {..._props}>
      <FormContext.Provider value={form}>
        {fml.children}
      </FormContext.Provider>
    </form>
  )
}

export const Form = Object.assign(Form_, {
  createProps,
  createContext,
  Context: FormContext,
  Group: FormGroup,
})
