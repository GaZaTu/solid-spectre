import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { CalendarBody } from "./Calendar.Body"
import { CalendarContainer } from "./Calendar.Container"
import { CalendarDate } from "./Calendar.Date"
import { CalendarDateItem } from "./Calendar.DateItem"
import { CalendarHeader } from "./Calendar.Header"
import { CalendarNavbar } from "./Calendar.Navbar"
// css
import "./Calendar.css"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "calendar": true,
      })
    },
  }
})

function Calendar_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      {fml.children}
    </div>
  )
}

export const Calendar = Object.assign(Calendar_, {
  createProps,
  Navbar: CalendarNavbar,
  Container: CalendarContainer,
  Header: CalendarHeader,
  Body: CalendarBody,
  Date: CalendarDate,
  DateItem: CalendarDateItem,
})
