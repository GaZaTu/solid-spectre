// css
import "./Column.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { ThemeBreakpoint } from "../util/theming"
import { ColumnRow } from "./Column.Row"

type Props = {
  offset?: "ml" | "mr" | "mx"
} & Partial<Record<ThemeBreakpoint, 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | "auto">>

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "column": true,
        [`col-${props.offset}-auto`]: !!props.offset,
        [`col-xs-${props.xs}`]: !!props.xs,
        [`col-sm-${props.sm}`]: !!props.sm,
        [`col-md-${props.md}`]: !!props.md,
        [`col-lg-${props.lg}`]: !!props.lg,
        [`col-xl-${props.xl}`]: !!props.xl,
        [`col-${props.xxl}`]: !!props.xxl,
      })
    },
  }
})

function Column_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      {fml.children}
    </div>
  )
}

export const Column = Object.assign(Column_, {
  createProps,
  Row: ColumnRow,
})
