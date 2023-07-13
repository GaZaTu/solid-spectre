import type { Meta, StoryObj } from "storybook-solidjs"
import { Checkbox } from "../ui/Checkbox"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    children: {
      type: "string",
    },
    size: {
      type: {
        name: "enum",
        value: ["sm", "md", "lg"],
      },
    },
    checked: {
      type: "boolean",
    },
    indeterminate: {
      type: "boolean",
    },
  },
  args: {
    children: "Test",
    checked: false,
    indeterminate: false,
  },
} satisfies Meta<typeof Checkbox>
4
export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Basic: Story = {
  args: {},
}
