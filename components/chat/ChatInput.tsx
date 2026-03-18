'use client'

import { useState, KeyboardEvent } from 'react'
import { Button } from '@/components/shared/button'
import { Textarea } from '@/components/shared/textarea'
import { SendHorizonal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading: boolean
  placeholder?: string
}

export function ChatInput({ onSend, isLoading, placeholder }: ChatInputProps) {
  const [value, setValue] = useState('')

  const handleSend = () => {
    const trimmed = value.trim()
    if (!trimmed || isLoading) return
    onSend(trimmed)
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex items-end gap-2 p-4 border-t bg-background">
      <Textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder ?? 'Type your question...'}
        disabled={isLoading}
        rows={1}
        className="resize-none min-h-[44px] max-h-[160px] rounded-xl"
      />
      <Button
        onClick={handleSend}
        disabled={!value.trim() || isLoading}
        size="icon"
        className="shrink-0 h-11 w-11 rounded-xl"
      >
        <SendHorizonal className="h-4 w-4" />
      </Button>
    </div>
  )
}