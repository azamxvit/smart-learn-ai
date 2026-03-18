'use client'

import { useEffect, useRef } from 'react'
import { Message } from '@/types'
import { ChatMessage } from './ChatMessage'
import { ScrollArea } from '@/components/shared/scroll-area'
import { Loader2 } from 'lucide-react'

interface ChatWindowProps {
  messages: Message[]
  isLoading: boolean
  welcomeMessage?: string
}

export function ChatWindow({ messages, isLoading, welcomeMessage }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <ScrollArea className="flex-1 px-4 py-6">
      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        {messages.length === 0 && welcomeMessage && (
          <div className="text-center text-muted-foreground text-sm py-8">
            {welcomeMessage}
          </div>
        )}

        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Thinking...</span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}