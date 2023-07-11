// css
import "./OffCanvas.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { OffCanvasContent } from "./OffCanvas.Content"
import { OffCanvasSidebar } from "./OffCanvas.Sidebar"

type Props = {
  showlg?: boolean
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "off-canvas": true,
        "off-canvas-sidebar-show-lg": props.showlg,
      })
    },
  }
})

function OffCanvas_(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      {fml.children}
    </div>
  )
}

export const OffCanvas = Object.assign(OffCanvas_, {
  createProps,
  Sidebar: OffCanvasSidebar,
  Content: OffCanvasContent,
})
