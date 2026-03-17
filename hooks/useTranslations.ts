import { useState, useCallback } from 'react'

type Locale = 'kz' | 'ru' | 'en'

type Messages = {
  app: {
    title: string
    subtitle: string
  }
  chat: {
    placeholder: string
    send: string
    loading: string
    error: string
    welcome: string
  }
  header: {
    clearChat: string
  }
}

const localeMessages: Record<Locale, () => Promise<{ default: Messages }>> = {
  kz: () => import('../messages/kz/common.json'),
  ru: () => import('../messages/ru/common.json'),
  en: () => import('../messages/en/common.json'),
}

export function useTranslations() {
  const [locale, setLocale] = useState<Locale>('ru')
  const [messages, setMessages] = useState<Messages | null>(null)

  const loadMessages = useCallback(async (newLocale: Locale) => {
    const mod = await localeMessages[newLocale]()
    setMessages(mod.default)
    setLocale(newLocale)
  }, [])

  const t = useCallback(
    (key: string): string => {
      if (!messages) return key
      const keys = key.split('.')
      let result: unknown = messages
      for (const k of keys) {
        result = (result as Record<string, unknown>)?.[k]
      }
      return (result as string) ?? key
    },
    [messages]
  )

  return { t, locale, loadMessages }
}