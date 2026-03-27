import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ChatInput } from '../ChatInput'

const meta: Meta<typeof ChatInput> = {
  title: 'Chat/ChatInput',
  component: ChatInput,
}

export default meta
type Story = StoryObj<typeof ChatInput>

export const Default: Story = {
  args: {
    onSend: (msg) => console.log('Sent:', msg),
    isLoading: false,
    placeholder: 'Напишите ваш вопрос...',
  },
}

export const Loading: Story = {
  args: {
    onSend: () => {},
    isLoading: true,
    placeholder: 'Напишите ваш вопрос...',
  },
}