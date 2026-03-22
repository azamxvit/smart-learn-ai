import { render, screen, fireEvent } from '@testing-library/react'
import { ChatInput } from '@/components/chat/ChatInput'

describe('ChatInput', () => {
  it('рендерит textarea и кнопку отправки', () => {
    render(<ChatInput onSend={jest.fn()} isLoading={false} />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('кнопка задизейблена когда поле пустое', () => {
    render(<ChatInput onSend={jest.fn()} isLoading={false} />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('кнопка активна когда есть текст', () => {
    render(<ChatInput onSend={jest.fn()} isLoading={false} />)
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Привет' },
    })
    expect(screen.getByRole('button')).not.toBeDisabled()
  })

  it('вызывает onSend при клике на кнопку', () => {
    const onSend = jest.fn()
    render(<ChatInput onSend={onSend} isLoading={false} />)
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Тест сообщение' },
    })
    fireEvent.click(screen.getByRole('button'))
    expect(onSend).toHaveBeenCalledWith('Тест сообщение')
  })

  it('очищает поле после отправки', () => {
    render(<ChatInput onSend={jest.fn()} isLoading={false} />)
    const textarea = screen.getByRole('textbox')
    fireEvent.change(textarea, { target: { value: 'Тест' } })
    fireEvent.click(screen.getByRole('button'))
    expect(textarea).toHaveValue('')
  })

  it('дизейблит всё во время загрузки', () => {
    render(<ChatInput onSend={jest.fn()} isLoading={true} />)
    expect(screen.getByRole('textbox')).toBeDisabled()
    expect(screen.getByRole('button')).toBeDisabled()
  })
})