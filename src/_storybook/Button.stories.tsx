import type { Meta, StoryObj } from "storybook-solidjs"
import { Button } from "../ui/Button"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/Button",
  component: Button,
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
    color: {
      type: {
        name: "enum",
        value: ["primary", "secondary", "success", "warning", "failure", "link", "gray", "transparent"],
      },
    },
    round: {
      type: "boolean",
    },
    circle: {
      type: "boolean",
    },
    action: {
      type: "boolean",
    },
    block: {
      type: "boolean",
    },
    clear: {
      type: "boolean",
    },
    outlined: {
      type: "boolean",
    },
    active: {
      type: "boolean",
    },
    loading: {
      type: "boolean",
    },
    disabled: {
      type: "boolean",
    },
  },
  args: {
    children: "Test",
    size: "md",
    color: "primary",
    round: false,
    circle: false,
    action: false,
    block: false,
    clear: false,
    outlined: false,
    active: false,
    loading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Basic: Story = {
  args: {},
}
