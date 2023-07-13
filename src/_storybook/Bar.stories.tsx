import type { Meta, StoryObj } from "storybook-solidjs"
import { Bar } from "../ui/Bar"
import { bgColor } from "../util/colors"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/Bar",
  component: Bar,
  tags: ["autodocs"],
  argTypes: {
    slider: {
      type: "boolean",
    },
    size: {
      type: {
        name: "enum",
        value: ["sm", "lg"],
      },
    },
  },
  args: {
    slider: false,
  },
} satisfies Meta<typeof Bar>
4
export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Basic: Story = {
  args: {},
  render: args => (
    <Bar {...args}>
      <Bar.Section percent={15} class={`${bgColor("success")}`} />
      <Bar.Section percent={45} class={`${bgColor("failure")}`} />
    </Bar>
  ),
}
