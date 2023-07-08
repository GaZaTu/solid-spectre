import FeatherIconProvider from "./FeatherIconProvider"
import CheckboxButton from "./ui/CheckboxButton"
import Icon, { IconContext } from "./ui/Icon"
import iconCheckSquare from "./icons/iconCheckSquare"
import iconMinusSquare from "./icons/iconMinusSquare"
import iconSquare from "./icons/iconSquare"

const registerFeatherIcons = () => {
  IconContext.Provider = FeatherIconProvider
  IconContext.iconArrowLeft = FeatherIconProvider.iconArrowLeft
  IconContext.iconArrowRight = FeatherIconProvider.iconArrowRight
  IconContext.iconArrowUp = FeatherIconProvider.iconArrowUp
  IconContext.iconArrowDown = FeatherIconProvider.iconArrowDown
  IconContext.iconPhoto = FeatherIconProvider.iconPhoto
  IconContext.iconCross = FeatherIconProvider.iconCross
  IconContext.iconMenu = FeatherIconProvider.iconMenu
  IconContext.iconOpen = FeatherIconProvider.iconOpen
  IconContext.iconSearch = FeatherIconProvider.iconSearch

  CheckboxButton.Defaults.IfTrue = () => <Icon src={iconCheckSquare} color="var(--success)" />
  CheckboxButton.Defaults.IfFalse = () => <Icon src={iconSquare} color="var(--body-fg-monochrome)" />
  CheckboxButton.Defaults.IfIndeterminate = () => <Icon src={iconMinusSquare} color="var(--success)" />
}

export default registerFeatherIcons
