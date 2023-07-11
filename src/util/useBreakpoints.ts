import { createBreakpoints } from "@solid-primitives/media"
import { getThemeValue } from "./getThemeValue"
import { ThemeBreakpoint } from "./theming"

const windowMatchesBreakpoint = <K extends ThemeBreakpoint>(key: K) => {
  return {
    [key]: getThemeValue(`--size-${key}`),
  } as { [key in K]: string }
}

export const useBreakpoints = () => {
  const breakpoints = {
    ...windowMatchesBreakpoint("xs"),
    ...windowMatchesBreakpoint("sm"),
    ...windowMatchesBreakpoint("md"),
    ...windowMatchesBreakpoint("lg"),
    ...windowMatchesBreakpoint("xl"),
    ...windowMatchesBreakpoint("xxl"),
  }

  const matches = createBreakpoints(breakpoints, {
    watchChange: true,
    mediaFeature: "min-width",
    fallbackState: {
      key: "xs",
      xs: true,
      sm: false,
      md: false,
      lg: false,
      xl: false,
      xxl: false,
    },
  })

  return matches
}
