'use client'

import { useEffect } from 'react'
import { useChat } from '@/hooks/useChat'
import { useTranslations } from '@/hooks/useTranslations'
import { ChatWindow } from '@/components/chat/ChatWindow'
import { ChatInput } from '@/components/chat/ChatInput'
import { Header } from '@/components/layout/Header'
import { AppShell } from '@/components/layout/AppShell'

type Locale = 'kz' | 'ru' | 'en'

export default function Home() {
  const { messages, isLoading, error, sendMessage, clearChat } = useChat()
  const { t, locale, loadMessages } = useTranslations()

  useEffect(() => {
    loadMessages('ru')
  }, [loadMessages])

  return (
    <AppShell>
      {(_activeChatId, _onNewChat) => (
        <div className="flex flex-col h-full">
          <Header
            onClearChat={clearChat}
            locale={locale as Locale}
            onLocaleChange={(l) => loadMessages(l)}
          />

          <ChatWindow
            messages={messages}
            isLoading={isLoading}
            welcomeMessage={t('chat.welcome')}
          />

          {error && (
            <div className="text-center text-sm text-destructive px-4 pb-2">
              {t('chat.error')}
            </div>
          )}

          <ChatInput
            onSend={sendMessage}
            isLoading={isLoading}
            placeholder={t('chat.placeholder')}
          />
        </div>
      )}
    </AppShell>
  )
}