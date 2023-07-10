import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
// css
import "./Calendar.css"

type Props = {
  isToday?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "date-item": true,
        "date-today": !!props.isToday,
      })
    },
  }
})

function CalendarDateItem_(props: Props & ComponentProps<"button">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <button {..._props}>
      {fml.children}
    </button>
  )
}

export const CalendarDateItem = Object.assign(CalendarDateItem_, {
  createProps,
})
