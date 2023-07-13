import type { Meta, StoryObj } from "storybook-solidjs"
import { Accordion } from "../ui/Accordion"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  argTypes: {
    children: {
      type: "string",
    },
    open: {
      type: "boolean",
    },
    header: {
      type: "string",
    },
    headerIcon: {
      type: "boolean",
    },
    headerIconFloatRight: {
      type: "boolean",
    },
  },
  args: {
    children: "Body",
    open: false,
    header: "Header",
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Basic: Story = {
  args: {},
}
