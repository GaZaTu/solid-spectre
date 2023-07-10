import { ComponentProps, createContext } from "solid-js"
import { A_ } from "./A"

export const ModalContext = createContext({
  active: () => false as boolean,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onclose: () => (() => { }) as ComponentProps<typeof A_>["onclick"],
  oncloseHref: () => undefined as ComponentProps<typeof A_>["href"],
})
