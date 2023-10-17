import { createContext, createSignal, JSX } from "solid-js"
import { A } from "./A"

const TabsRadioGroup_ = createContext({
  exists: () => false as boolean,
  activeId: () => undefined as string | undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setActiveId: (id: string | undefined) => {},
  bodyNode: () => undefined as Node | undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setBodyNode: (node: Node) => {},
})

const _Provider = TabsRadioGroup_.Provider

type ProviderProps = {
  children?: JSX.Element
  useSearchParam?: boolean | string
}

const Provider = (props: ProviderProps) => {
  const [activeId, setActiveId] = props.useSearchParam ? A.createSearchParamSignal((typeof props.useSearchParam === "string") ? props.useSearchParam : "tab", String) : createSignal<string>()
  const [bodyNode, setBodyNode] = createSignal<Node>()

  const context = {
    exists: () => true,
    activeId,
    setActiveId,
    bodyNode,
    setBodyNode,
  }

  return (
    <_Provider value={context}>
      {props.children}
    </_Provider>
  )
}

export const TabsRadioGroup = Object.assign(TabsRadioGroup_, {
  Provider,
})
