import type { Meta, StoryObj } from "storybook-solidjs"
import { Select } from "../ui/Select"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
  },
  args: {
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Basic: Story = {
  args: {},
}
