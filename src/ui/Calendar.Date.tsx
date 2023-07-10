import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
// css
import "./Calendar.css"

type Props = {
  isRange?: boolean
  isRangeStart?: boolean
  isRangeEnd?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "calendar-date": true,
        "calendar-range": !!props.isRange,
        "range-start": !!props.isRangeStart,
        "range-end": !!props.isRangeEnd,
      })
    },
  }
})

function CalendarDate_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      {fml.children}
    </div>
  )
}

export const CalendarDate = Object.assign(CalendarDate_, {
  createProps,
})
