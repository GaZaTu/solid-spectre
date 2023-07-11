// css
import "./FeatherIconProvider.css"
// js
import { ComponentProps, splitProps } from "solid-js"
import { iconAlertCircle } from "../icons/iconAlertCircle"
import { iconAlertTriangle } from "../icons/iconAlertTriangle"
import { iconCheckCircle } from "../icons/iconCheckCircle"
import { iconCheckSquare } from "../icons/iconCheckSquare"
import { iconChevronDown } from "../icons/iconChevronDown"
import { iconChevronLeft } from "../icons/iconChevronLeft"
import { iconChevronRight } from "../icons/iconChevronRight"
import { iconChevronUp } from "../icons/iconChevronUp"
import { iconExternalLink } from "../icons/iconExternalLink"
import { iconImage } from "../icons/iconImage"
import { iconInfo } from "../icons/iconInfo"
import { iconMenu } from "../icons/iconMenu"
import { iconMinusSquare } from "../icons/iconMinusSquare"
import { iconSearch } from "../icons/iconSearch"
import { iconSquare } from "../icons/iconSquare"
import { iconX } from "../icons/iconX"
import { CheckboxButton } from "../ui/CheckboxButton"
import { Icon, IconContext } from "../ui/Icon"
import { classnames } from "./classnames"
import { createHTMLMemoHook } from "./createHTMLMemoHook"

type Props =  ComponentProps<"i"> & {
  src?: string
  size?: string | "sm" | "md" | "lg" | "xl"
  color?: string
  weight?: string | "light" | "normal" | "bold"
  fill?: string
}

const convertSize = (size: Props["size"]) => {
  switch (size) {
  case "sm":
    return "22px"
  case "md":
    return "30px"
  case "lg":
    return "40px"
  case "xl":
    return "52px"
  default:
    return size
  }
}

const convertWeight = (weight: Props["weight"]) => {
  switch (weight) {
  case "light":
    return "1px"
  case "normal":
    return "2px"
  case "bold":
    return "3px"
  default:
    return weight
  }
}

const createProps = createHTMLMemoHook((props: Props) => {
  return {
    get class() {
      return classnames({
        "spectre-icon": true,
      })
    },
    get style() {
      return {
        ...(props.style as {}),
        ...(props.color ? { "color": props.color } : {}),
        ...(props.size ? { "--feather-size": convertSize(props.size) } : {}),
        ...(props.weight ? { "--feather-weight": convertWeight(props.weight) } : {}),
        ...(props.fill ? { "--feather-fill": props.fill } : {}),
      }
    },
  }
})

function FeatherIconProvider_(props: Props) {
  const [fml, _props] = splitProps(props, ["src"])
  const [__props] = createProps(_props)

  return (
    // eslint-disable-next-line solid/no-innerhtml
    <i {...__props} innerHTML={fml.src} />
  )
}

export const FeatherIconProvider = Object.assign(FeatherIconProvider_, {
  createProps,
  register: () => {
    IconContext.Provider = FeatherIconProvider
    IconContext.iconArrowLeft = iconChevronLeft
    IconContext.iconArrowRight = iconChevronRight
    IconContext.iconArrowUp = iconChevronUp
    IconContext.iconArrowDown = iconChevronDown
    IconContext.iconPhoto = iconImage
    IconContext.iconCross = iconX
    IconContext.iconMenu = iconMenu
    IconContext.iconOpen = iconExternalLink
    IconContext.iconSearch = iconSearch
    IconContext.iconInfo = iconInfo
    IconContext.iconCheckCircle = iconCheckCircle
    IconContext.iconAlertTriangle = iconAlertTriangle
    IconContext.iconAlertCircle = iconAlertCircle

    CheckboxButton.Defaults.IfTrue = () => <Icon src={iconCheckSquare} color="var(--success)" />
    CheckboxButton.Defaults.IfFalse = () => <Icon src={iconSquare} color="var(--body-fg-monochrome)" />
    CheckboxButton.Defaults.IfIndeterminate = () => <Icon src={iconMinusSquare} color="var(--success)" />
  },
})
