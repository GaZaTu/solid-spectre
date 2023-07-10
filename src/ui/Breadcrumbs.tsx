import { ComponentProps, For, splitProps } from "solid-js"
import { childrenArray } from "../util/childrenArray"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
// css
import "./Breadcrumbs.css"

type Props = {
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "breadcrumbs": true,
      })
    },
  }
})

function Breadcrumbs_(props: Props & ComponentProps<"ul">) {
  const [fml] = splitProps(props, ["children"])
  const [_props] = createProps(props)

  const resolvedChildren = childrenArray(() => fml.children)

  return (
    <ul {..._props}>
      <For each={resolvedChildren()}>
        {child => (
          <li class="breadcrumb-item">{child}</li>
        )}
      </For>
    </ul>
  )
}

export const Breadcrumbs = Object.assign(Breadcrumbs_, {
  createProps,
})
