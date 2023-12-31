import { Component, ComponentProps, splitProps } from "solid-js"

export const IconContext = {
  Provider: (() => null) as Component<Props>,
  iconArrowLeft: "",
  iconArrowRight: "",
  iconArrowUp: "",
  iconArrowDown: "",
  iconPhoto: "",
  iconCross: "",
  iconMenu: "",
  iconOpen: "",
  iconSearch: "",
  iconInfo: "",
  iconCheckCircle: "",
  iconAlertTriangle: "",
  iconAlertCircle: "",
}

type Props = ComponentProps<"i"> & {
  src?: string
  size?: string | "sm" | "md" | "lg" | "xl"
  color?: string
  weight?: string | "light" | "normal" | "bold"
  fill?: string
}

function Icon_(props: Props) {
  const [fml] = splitProps(props, ["children"])

  return (
    <IconContext.Provider {...props}>
      {fml.children}
    </IconContext.Provider>
  )
}

export const Icon = Object.assign(Icon_, {
  Context: IconContext,
  registerProvider: (Provider: { register: () => unknown }) => {
    Provider.register()
  },
})
