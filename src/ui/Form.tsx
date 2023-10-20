// css
import "./Form.css"
// js
import { CreateSubmitHandlerConfig, FormConfigWithTransformFn, Paths, UnknownHelpers, UnknownStores } from "@felte/core"
import { createForm } from "@felte/solid"
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { FormContext } from "./Form.Context"
import { FormGroup } from "./Form.Group"

type Obj = Record<string, any>

type FormProps<Data extends Obj> = {
  /** Action function to be used with the `use` directive on your `form` elements. */
  form: (node: HTMLFormElement) => {
    destroy: () => void
  }
  /** Function to handle submit to be passed to the on:submit event. Not necessary if using the `form` action. */
  handleSubmit: (e?: Event) => void
  /** Function that creates a submit handler. If a function is passed as first argument it overrides the default `onSubmit` function set in the `createForm` config object. */
  createSubmitHandler: (altConfig?: CreateSubmitHandlerConfig<Data>) => (e?: Event) => void
}

type FelteConfig<Data extends Obj = Obj, Ext extends Obj = Obj> = NonNullable<FormConfigWithTransformFn<Data> & Ext> & {
  isRequired?: (name?: string) => boolean
}

type FelteContext<Data extends Obj = Obj> = FormProps<Data> & UnknownHelpers<Data, Paths<Data>> & UnknownStores<Data> & {
  isRequired?: (name?: string) => boolean
}

const createContext = <Data extends Obj = Obj, Ext extends Obj = Obj>(config: FelteConfig<Data, Ext>): FelteContext => {
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
  context?: FelteContext<any>
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
      return (_props.context as any)?.data(name)
    },
    getError: (name) => {
      return (_props.context as any)?.errors(name)?.[0]
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
