'use client'

import { useState, useCallback } from 'react'
import { Sidebar } from './Sidebar'

interface Chat {
  id: string
  title: string
  createdAt: Date
}

interface AppShellProps {
  children: (activeChatId: string | null, onNewChat: () => void) => React.ReactNode
}

function generateId() {
  return Math.random().toString(36).slice(2, 9)
}

export function AppShell({ children }: AppShellProps) {
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)

  const handleNewChat = useCallback(() => {
    const newChat: Chat = {
      id: generateId(),
      title: `Чат ${chats.length + 1}`,
      createdAt: new Date(),
    }
    setChats((prev) => [newChat, ...prev])
    setActiveChatId(newChat.id)
  }, [chats.length])

  const handleDeleteChat = useCallback((id: string) => {
    setChats((prev) => prev.filter((c) => c.id !== id))
    setActiveChatId((prev) => (prev === id ? null : prev))
  }, [])

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={setActiveChatId}
        onDeleteChat={handleDeleteChat}
      />
      <main className="flex-1 flex flex-col overflow-hidden">
        {children(activeChatId, handleNewChat)}
      </main>
    </div>
  )
}