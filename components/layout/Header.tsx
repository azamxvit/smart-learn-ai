'use client'

import { Button } from '@/components/shared/button'
import { Badge } from '@/components/shared/badge'
import { Trash2, Moon, Sun } from 'lucide-react'
import { useState } from 'react'

type Locale = 'kz' | 'ru' | 'en'

interface HeaderProps {
  onClearChat: () => void
  locale: Locale
  onLocaleChange: (locale: Locale) => void
  chatTitle?: string
}

const locales: Locale[] = ['kz', 'ru', 'en']

export function Header({ onClearChat, locale, onLocaleChange, chatTitle }: HeaderProps) {
  const [dark, setDark] = useState(false)

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark')
    setDark(!dark)
  }

  return (
    <header className="border-b bg-background/80 backdrop-blur-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm text-foreground">
          {chatTitle ?? 'Новый чат'}
        </span>
        <Badge variant="secondary" className="text-xs">Beta</Badge>
      </div>

      <div className="flex items-center gap-2">
        {/* Language switcher */}
        <div className="flex items-center gap-0.5 border rounded-lg p-1">
          {locales.map((l) => (
            <button
              key={l}
              onClick={() => onLocaleChange(l)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-all ${
                locale === l
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Dark mode */}
        <Button variant="ghost" size="icon" onClick={toggleDark} className="h-8 w-8">
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>

        {/* Clear */}
        <Button variant="ghost" size="icon" onClick={onClearChat} className="h-8 w-8">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}