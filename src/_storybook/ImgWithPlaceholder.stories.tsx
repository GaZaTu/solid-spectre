import type { Meta, StoryObj } from "storybook-solidjs"
import { ImgWithPlaceholder } from "../ui/ImgWithPlaceholder"
import apus from "./assets/gazatu-apus.webp"
import bee from "./assets/bee.svg"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/ImgWithPlaceholder",
  component: ImgWithPlaceholder,
  tags: ["autodocs"],
  argTypes: {
    src: {
      type: {
        name: "enum",
        value: ["", apus, bee],
      },
    },
    useFetch: {
      type: "boolean",
    },
  },
  args: {
    src: "",
    useFetch: false,
  },
} satisfies Meta<typeof ImgWithPlaceholder>
4
export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Basic: Story = {
  args: {},
}
