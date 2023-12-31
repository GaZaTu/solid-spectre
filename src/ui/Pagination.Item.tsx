// css
import "./Pagination.css"
// js
import { ComponentProps, Show, splitProps } from "solid-js"
import { classnames } from "../util/classnames"
import { createHTMLMemoHook } from "../util/createHTMLMemoHook"
import { A } from "./A"

type Props = {
  page?: number
  isPrev?: boolean
  isNext?: boolean
  active?: boolean
  disabled?: boolean

  queryParams?: ComponentProps<typeof A>["params"]
  onclick?: ComponentProps<typeof A>["onclick"]
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
      <Show when={fml.queryParams || fml.onclick} fallback={
        <span>{fml.children}</span>
      }>
        <A href={fml.queryParams ? "" : undefined} params={fml.queryParams} keepExistingParams replace onclick={fml.onclick} tabIndex={props.disabled ? -1 : undefined} data-page={props.page}>{fml.children}</A>
      </Show>
    </li>
  )
}

export const PaginationItem = Object.assign(PaginationItem_, {
  createProps,
})
