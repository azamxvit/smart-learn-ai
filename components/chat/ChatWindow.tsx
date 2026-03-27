'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Message } from '@/types'
import { ChatMessage } from './ChatMessage'
import { ScrollArea } from '@/components/shared/scroll-area'
import { WelcomeScreen } from '@/components/sections/WelcomeScreen'
import { Loader2 } from 'lucide-react'

interface ChatWindowProps {
  messages: Message[]
  isLoading: boolean
  welcomeMessage?: string
  onSuggestionClick?: (text: string) => void
}

export function ChatWindow({
  messages,
  isLoading,
  welcomeMessage,
  onSuggestionClick,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 overflow-hidden">
        <WelcomeScreen
          welcomeMessage={welcomeMessage}
          onSuggestionClick={onSuggestionClick ?? (() => {})}
        />
      </div>
    )
  }

  return (
    <ScrollArea className="flex-1 px-4 py-6">
      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-muted-foreground text-sm pl-11"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Думаю...</span>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  )
}