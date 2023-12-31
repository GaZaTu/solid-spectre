import { Accessor, children, createMemo, JSX } from "solid-js"

export const childrenArray = (fn: Accessor<JSX.Element>) => {
  const resolvedChildren = children(fn)
  const resolvedChildrenArray = createMemo(() => {
    let children = resolvedChildren()
    if (!Array.isArray(children)) {
      children = [children]
    }

    return children
  })

  return resolvedChildrenArray
}
