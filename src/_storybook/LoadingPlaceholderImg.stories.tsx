import type { Meta, StoryObj } from "storybook-solidjs"
import { LoadingPlaceholderImg } from "../ui/LoadingPlaceholder.Img"
import apus from "./assets/gazatu-apus.webp"
import bee from "./assets/bee.svg"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/LoadingPlaceholderImg",
  component: LoadingPlaceholderImg,
  tags: ["autodocs"],
  argTypes: {
    src: {
      type: {
        name: "enum",
        value: ["", apus, bee],
      },
    },
  },
  args: {
    src: "",
  },
} satisfies Meta<typeof LoadingPlaceholderImg>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Basic: Story = {
  args: {},
}
