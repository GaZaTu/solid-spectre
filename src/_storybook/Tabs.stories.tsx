import type { Meta, StoryObj } from "storybook-solidjs"
import { iconSearch } from "../icons/iconSearch"
import { A } from "../ui/A"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"
import { Tabs } from "../ui/Tabs"
import { badge } from "../util/badge"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    block: {
      type: "boolean",
    },
    bottomNav: {
      type: "boolean",
    },
  },
  args: {
    block: false,
    bottomNav: false,
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Basic: Story = {
  args: {},
  render: args => (
    <Tabs {...args}>
      <Tabs.Panel header={<A>Tab1</A>} initial>
        Content 1
      </Tabs.Panel>

      <Tabs.Panel header={<A {...badge(2)}>Tab2</A>}>
        Content 2
      </Tabs.Panel>

      <Tabs.Panel action header={
        <Input.Group inline>
          <Input size="sm" iconSrcLeft={iconSearch} />
          <Button size="sm" color="primary">Search</Button>
        </Input.Group>
      } />
    </Tabs>
  ),
}
