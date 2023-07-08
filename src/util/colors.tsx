import { createUtility, ThemeColor } from "./theming"
import "./colors.css"

export const fgColor = createUtility((color: ThemeColor | undefined) => {
  return color ? `text-${color}` : undefined
})

export const bgColor = createUtility((color: ThemeColor | undefined) => {
  return color ? `bg-${color}` : undefined
})
