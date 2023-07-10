import classnames from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import "./Table.css"
import createHTMLMemoHook from "../util/createHTMLMemoHook"

type Props = {
  active?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "active": props.active,
      })
    },
  }
})

function TableRow(props: Props & ComponentProps<"tr">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <tr {..._props}>
      {fml.children}
    </tr>
  )
}

export default Object.assign(TableRow, {
  createProps,
})
