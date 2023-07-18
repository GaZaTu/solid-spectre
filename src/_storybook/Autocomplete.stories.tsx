import type { Meta, StoryObj } from "storybook-solidjs"
import { Autocomplete } from "../ui/Autocomplete"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/Autocomplete",
  component: Autocomplete,
  tags: ["autodocs"],
  argTypes: {
  },
  args: {
  },
} satisfies Meta<typeof Autocomplete>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Basic: Story = {
  args: {},
  render: args => {
    const data = () => [{ name: "option1" }, { name: "option2" }]
    const options = Autocomplete.createOptions(data, {
      filterable: true,
      createable: () => false,
      key: "name",
    })

    return (
      <div style={{ "min-height": "10rem" }}>
        <Autocomplete {...args} {...options} />
      </div>
    )
  },
}
