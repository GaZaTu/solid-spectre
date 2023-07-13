import type { Meta, StoryObj } from "storybook-solidjs"
import { Chip } from "../ui/Chip"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    children: {
      type: "string",
    },
    active: {
      type: "boolean",
    },
  },
  args: {
    children: "Test",
    active: false,
  },
} satisfies Meta<typeof Chip>
4
export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Basic: Story = {
  args: {},
}
