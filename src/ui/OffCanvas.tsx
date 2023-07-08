import classnames from "classnames"
import { ComponentProps, splitProps } from "solid-js"
import "./OffCanvas.css"
import createHTMLMemoHook from "../util/createHTMLMemoHook"
import OffCanvasSidebar from "./OffCanvas.Sidebar"
import OffCanvasContent from "./OffCanvas.Content"

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

function OffCanvas(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <div {..._props}>
      {fml.children}
    </div>
  )
}

export default Object.assign(OffCanvas, {
  createProps,
  Sidebar: OffCanvasSidebar,
  Content: OffCanvasContent,
})
