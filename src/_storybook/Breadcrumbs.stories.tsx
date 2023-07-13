import type { Meta, StoryObj } from "storybook-solidjs"
import { Breadcrumbs } from "../ui/Breadcrumbs"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/Breadcrumbs",
  component: Breadcrumbs,
  tags: ["autodocs"],
  argTypes: {
    children: {
      type: {
        name: "array",
        value: {
          name: "string",
        },
      },
    },
  },
  args: {
    children: ["Parent", "Child"],
  },
} satisfies Meta<typeof Breadcrumbs>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Basic: Story = {
  args: {},
}
