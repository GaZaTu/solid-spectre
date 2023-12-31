// css
import "./loading.css"
// js
import { createUtility } from "./theming"

export const loading = createUtility((size: "sm" | "lg" | undefined) => {
  return size ? `loading loading${size === "lg" ? "-lg" : ""}` : undefined
})
