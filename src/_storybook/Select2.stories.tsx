import type { Meta, StoryObj } from "storybook-solidjs"
import { Select2 } from "../ui/Select2"
import { ModalPortal } from "../ui/Modal.Portal"
import { createSignal } from "solid-js"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/Select2",
  component: Select2,
  tags: ["autodocs"],
  argTypes: {
  },
  args: {
  },
} satisfies Meta<typeof Select2>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Basic: Story = {
  args: {},
  render: args => {
    const [value, setValue] = createSignal<string>()
    const select = Select2.createOptionProps({
      get options() {
        return ["option1", "option2", "option3", "option4", "option5", "option6", "option7", "option8", "option9"]
      },
      keyofOption: o => o,
      renderOption: o => o,
      stringifyOption: o => o,
      onselect: setValue,
      get selected() {
        return value()
      },
    })

    return (
      <div style={{ "height": "500px" }}>
        <Select2 {...select} />

        <ModalPortal />
      </div>
    )
  },
}
