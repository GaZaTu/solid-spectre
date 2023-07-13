import type { Meta, StoryObj } from "storybook-solidjs"
import { CheckboxButton } from "../ui/CheckboxButton"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/CheckboxButton",
  component: CheckboxButton,
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
    useColor: {
      type: "boolean",
    },
  },
  args: {
    children: "Test",
    checked: false,
    indeterminate: false,
    useColor: false,
  },
} satisfies Meta<typeof CheckboxButton>
4
export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Basic: Story = {
  args: {},
}
