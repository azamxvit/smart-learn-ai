import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ChatWindow } from '../ChatWindow'
import { Message } from '@/types'

const meta: Meta<typeof ChatWindow> = {
  title: 'Chat/ChatWindow',
  component: ChatWindow,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof ChatWindow>

const messages: Message[] = [
  {
    id: '1',
    role: 'user',
    content: 'Привет! Объясни что такое нейронная сеть',
    createdAt: new Date(),
  },
  {
    id: '2',
    role: 'assistant',
    content: 'Нейронная сеть — это математическая модель, вдохновлённая строением мозга. Она состоит из слоёв нейронов которые обрабатывают данные.',
    createdAt: new Date(),
  },
  {
    id: '3',
    role: 'user',
    content: 'А как она обучается?',
    createdAt: new Date(),
  },
]

export const Empty: Story = {
  args: {
    messages: [],
    isLoading: false,
    welcomeMessage: 'Привет! Я SmartLearnAI. Чем могу помочь?',
    onSuggestionClick: (text) => console.log('Suggestion:', text),
  },
}

export const WithMessages: Story = {
  args: {
    messages,
    isLoading: false,
    onSuggestionClick: () => {},
  },
}

export const Loading: Story = {
  args: {
    messages,
    isLoading: true,
    onSuggestionClick: () => {},
  },
}