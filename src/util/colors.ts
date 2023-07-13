// css
import "./colors.css"
// js
import { createUtility, ThemeColor } from "./theming"

export const bgColor = createUtility((color: ThemeColor | undefined) => {
  return color ? `bg-${color}` : undefined
})

// export const textColor = createUtility((color: ThemeColor | undefined) => {
//   return color ? `text-${color}` : undefined
// })
