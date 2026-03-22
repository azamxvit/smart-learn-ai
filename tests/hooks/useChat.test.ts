import { renderHook, act } from '@testing-library/react'
import { useChat } from '@/hooks/useChat'

global.fetch = jest.fn()

describe('useChat', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('начинает с пустым состоянием', () => {
    const { result } = renderHook(() => useChat())
    expect(result.current.messages).toEqual([])
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('добавляет сообщение пользователя при отправке', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ content: 'Ответ ассистента' }),
    })

    const { result } = renderHook(() => useChat())

    await act(async () => {
      await result.current.sendMessage('Привет')
    })

    expect(result.current.messages[0].role).toBe('user')
    expect(result.current.messages[0].content).toBe('Привет')
  })

  it('добавляет ответ ассистента после успешного запроса', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ content: 'Ответ ассистента' }),
    })

    const { result } = renderHook(() => useChat())

    await act(async () => {
      await result.current.sendMessage('Привет')
    })

    expect(result.current.messages[1].role).toBe('assistant')
    expect(result.current.messages[1].content).toBe('Ответ ассистента')
  })

  it('устанавливает ошибку при неудачном запросе', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false })

    const { result } = renderHook(() => useChat())

    await act(async () => {
      await result.current.sendMessage('Привет')
    })

    expect(result.current.error).not.toBeNull()
  })

  it('clearChat очищает все сообщения', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ content: 'Ответ' }),
    })

    const { result } = renderHook(() => useChat())

    await act(async () => {
      await result.current.sendMessage('Привет')
    })

    act(() => {
      result.current.clearChat()
    })

    expect(result.current.messages).toEqual([])
  })
})