'use client'

import { useState } from 'react'
import { MessageSquare, Plus, Trash2, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/shared/button'
import { ScrollArea } from '@/components/shared/scroll-area'
import { cn } from '@/lib/utils'

interface Chat {
  id: string
  title: string
  createdAt: Date
}

interface SidebarProps {
  chats: Chat[]
  activeChatId: string | null
  onNewChat: () => void
  onSelectChat: (id: string) => void
  onDeleteChat: (id: string) => void
}

export function Sidebar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'relative flex flex-col border-r bg-muted/30 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-4 border-b">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <BookOpen className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <span className="font-bold text-base tracking-tight">SmartLearnAI</span>
        )}
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <Button
          onClick={onNewChat}
          variant="outline"
          className={cn('w-full gap-2', collapsed && 'px-0 justify-center')}
        >
          <Plus className="h-4 w-4 shrink-0" />
          {!collapsed && <span>Новый чат</span>}
        </Button>
      </div>

      {/* Chat History */}
      {!collapsed && (
        <ScrollArea className="flex-1 px-3">
          <p className="text-xs text-muted-foreground px-2 mb-2 uppercase tracking-wider">
            История
          </p>
          <div className="flex flex-col gap-1">
            {chats.length === 0 && (
              <p className="text-xs text-muted-foreground px-2 py-4 text-center">
                Нет чатов
              </p>
            )}
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={cn(
                  'group flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors',
                  activeChatId === chat.id
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'hover:bg-muted text-foreground'
                )}
              >
                <MessageSquare className="h-4 w-4 shrink-0" />
                <span className="flex-1 truncate">{chat.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteChat(chat.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                </button>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full border bg-background flex items-center justify-center shadow-sm hover:bg-muted transition-colors z-10"
      >
        {collapsed
          ? <ChevronRight className="h-3 w-3" />
          : <ChevronLeft className="h-3 w-3" />
        }
      </button>
    </aside>
  )
}