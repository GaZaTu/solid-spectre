import { createContext } from "solid-js"

export const FormContext = createContext({
  getValue: ((name: string) => undefined as any),
  getError: ((name: string) => undefined as any),
  setValue: ((name: string, value: any) => undefined as void),
  setTouched: ((name: string, touched: boolean) => undefined as void),
  isRequired: ((name: string) => false as boolean),

  horizontal: false as boolean,
})
