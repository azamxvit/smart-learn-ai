import { render, screen } from '@testing-library/react'
import { ChatMessage } from '@/components/chat/ChatMessage'
import { Message } from '@/types'

const userMessage: Message = {
  id: '1',
  role: 'user',
  content: 'Привет, как дела?',
  createdAt: new Date(),
}

const assistantMessage: Message = {
  id: '2',
  role: 'assistant',
  content: 'Привет! Чем могу помочь?',
  createdAt: new Date(),
}

describe('ChatMessage', () => {
  it('рендерит сообщение пользователя', () => {
    render(<ChatMessage message={userMessage} />)
    expect(screen.getByText('Привет, как дела?')).toBeInTheDocument()
  })

  it('рендерит сообщение ассистента', () => {
    render(<ChatMessage message={assistantMessage} />)
    expect(screen.getByText('Привет! Чем могу помочь?')).toBeInTheDocument()
  })

  it('показывает аватар You для пользователя', () => {
    render(<ChatMessage message={userMessage} />)
    expect(screen.getByText('You')).toBeInTheDocument()
  })

  it('показывает аватар AI для ассистента', () => {
    render(<ChatMessage message={assistantMessage} />)
    expect(screen.getByText('AI')).toBeInTheDocument()
  })
})