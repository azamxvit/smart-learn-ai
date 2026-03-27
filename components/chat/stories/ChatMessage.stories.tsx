import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ChatMessage } from '../ChatMessage'

const meta: Meta<typeof ChatMessage> = {
  title: 'Chat/ChatMessage',
  component: ChatMessage,
}

export default meta
type Story = StoryObj<typeof ChatMessage>

export const UserMessage: Story = {
  args: {
    message: {
      id: '1',
      role: 'user',
      content: 'Объясни что такое машинное обучение простыми словами',
      createdAt: new Date(),
    },
  },
}

export const AssistantMessage: Story = {
  args: {
    message: {
      id: '2',
      role: 'assistant',
      content: 'Машинное обучение — это способность компьютера учиться на примерах, без явного программирования каждого правила.',
      createdAt: new Date(),
    },
  },
}

export const LongMessage: Story = {
  args: {
    message: {
      id: '3',
      role: 'assistant',
      content: 'Это очень длинный ответ ассистента. Нейронные сети — это математические модели, вдохновлённые строением мозга. Они состоят из слоёв нейронов, каждый из которых обрабатывает входные данные и передаёт результат дальше. Обучение происходит путём многократного показа примеров и корректировки весов связей между нейронами.',
      createdAt: new Date(),
    },
  },
}