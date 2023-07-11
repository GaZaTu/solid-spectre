// css
import "./tooltip.css"

export const tooltip = (text?: string, direction: "top" | "bottom" | "left" | "right" = "top") => {
  if (text === undefined) {
    return undefined
  }

  return {
    "data-has-tooltip": true,
    [`data-has-tooltip-${direction}`]: !!direction,
    "data-tooltip": text,
    "aria-label": text,
  }
}
