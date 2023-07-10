import { classnames } from "../util/classnames"
import { ComponentProps, splitProps } from "solid-js"
import { A_ } from "./A"
import "./Pagination.css"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"

type Props = {
  page?: number
  isPrev?: boolean
  isNext?: boolean
  active?: boolean
  disabled?: boolean

  queryParams?: ComponentProps<typeof A_>["params"]
  onclick?: ComponentProps<typeof A_>["onclick"]
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "page-item": true,
        "page-prev": props.isPrev,
        "page-next": props.isNext,
        "active": props.active,
        "disabled": props.disabled,
      })
    },
  }
})

function PaginationItem_(props: Props & Omit<ComponentProps<"li">, "onclick">) {
  const [fml] = splitProps(props, ["children", "onclick", "queryParams"])
  const [_props] = createProps(props)

  const onclick: ComponentProps<"li">["onclick"] = ev => {
    // ignore
  }

  return (
    <li {..._props} onclick={onclick}>
      {(fml.queryParams || fml.onclick) && (
        <A_ href={fml.queryParams ? "" : undefined} params={fml.queryParams} keepExistingParams replace onclick={fml.onclick} tabIndex={props.disabled ? -1 : undefined} data-page={props.page}>{fml.children}</A_>
      )}
      {(!fml.queryParams && !fml.onclick) && (
        <span>{fml.children}</span>
      )}
    </li>
  )
}

export const PaginationItem = Object.assign(PaginationItem_, {
  createProps,
})
