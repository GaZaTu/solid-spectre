import type { Meta, StoryObj } from "storybook-solidjs"
import { Code } from "../ui/Code"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/Code",
  component: Code,
  tags: ["autodocs"],
  argTypes: {
    children: {
      type: "string",
    },
    snippet: {
      type: "boolean",
    },
    lang: {
      type: "string",
    },
  },
  args: {
    children: "Test",
    snippet: false,
    lang: "md",
  },
} satisfies Meta<typeof Code>
4
export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Basic: Story = {
  args: {},
}
