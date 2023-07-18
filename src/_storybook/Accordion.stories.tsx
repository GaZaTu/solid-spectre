import type { Meta, StoryObj } from "storybook-solidjs"
import { Accordion } from "../ui/Accordion"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/Accordion",
  component: Accordion.Item,
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
    padded: {
      type: "boolean",
    },
  },
  args: {
    children: "Body 1",
    open: false,
    header: "Item 1",
    headerIcon: false,
    headerIconFloatRight: false,
    padded: false,
  },
} satisfies Meta<typeof Accordion.Item>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Basic: Story = {
  args: {},
  render: args => (
    <Accordion multiple>
      <Accordion.Item {...args} />
      <Accordion.Item {...args} header="Item 2" children="Body 2" />
    </Accordion>
  ),
}
