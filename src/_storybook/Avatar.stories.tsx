import type { Meta, StoryObj } from "storybook-solidjs"
import { Avatar } from "../ui/Avatar"

// More on how to set up stories at: https://storybook.js.org/docs/7.0/solid/writing-stories/introduction
const meta = {
  title: "Example/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      type: {
        name: "enum",
        value: ["xs", "sm", "md", "lg", "xl", "btn"],
      },
    },
    imageSrc: {
      type: "string",
    },
    imageAlt: {
      type: "string",
    },
    initials: {
      type: "string",
    },
    iconImageSrc: {
      type: "string",
    },
    iconImageAlt: {
      type: "string",
    },
    presence: {
      type: {
        name: "enum",
        value: ["offline", "online", "busy", "away"],
      },
    },
  },
  args: {
    initials: "XY",
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/7.0/solid/writing-stories/args
export const Basic: Story = {
  args: {},
}
