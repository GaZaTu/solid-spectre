// css
import "../src/css/normalize.css"
import "../src/css/base.css"
import "../src/css/typography.css"
import "./light-mode.css"


import { Icon } from "../src/ui/Icon"
import { FeatherIconProvider } from "../src/util/FeatherIconProvider"

Icon.registerProvider(FeatherIconProvider)

type Preview = {}

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffffff",
        },
        {
          name: "dark",
          value: "#3a3a3a",
        },
      ],
    },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
