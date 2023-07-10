import classnames from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import "./OffCanvas.css"
import createHTMLMemoHook from "../util/createHTMLMemoHook"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "off-canvas-content": true,
      })
    },
  }
})

function OffCanvasContent(props: Props & ComponentProps<"div">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  return (
    <>
      <div {..._props}>
        {fml.children}
      </div>
    </>
  )
}

export default Object.assign(OffCanvasContent, {
  createProps,
})
