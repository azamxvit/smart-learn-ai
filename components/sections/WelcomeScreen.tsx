'use client'

import { motion } from 'framer-motion'
import { BookOpen, Lightbulb, Code2, FlaskConical } from 'lucide-react'

interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void
  welcome?: string
}

const suggestions = [
  {
    icon: Lightbulb,
    label: 'Объясни концепцию',
    text: 'Объясни простыми словами что такое машинное обучение',
  },
  {
    icon: Code2,
    label: 'Помоги с кодом',
    text: 'Как работает рекурсия? Покажи пример на Python',
  },
  {
    icon: FlaskConical,
    label: 'Научный вопрос',
    text: 'Как работает нейронная сеть? Объясни пошагово',
  },
  {
    icon: BookOpen,
    label: 'Подготовка к экзамену',
    text: 'Помоги подготовиться к экзамену по линейной алгебре',
  },
]

export function WelcomeScreen({ onSuggestionClick, welcome }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-12 gap-8">

      {/* Logo + Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center gap-3"
      >
        <div className="h-16 w-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
          <BookOpen className="h-8 w-8 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">SmartLearnAI</h1>
        <p className="text-sm text-muted-foreground text-center max-w-sm">
          {welcome ?? 'Привет! Я твой умный учебный ассистент. Задай любой вопрос — объясню просто и понятно.'}
        </p>
      </motion.div>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-xl"
      >
        {suggestions.map((s, i) => (
          <motion.button
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.1 * i + 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSuggestionClick(s.text)}
            className="flex items-start gap-3 p-4 rounded-xl border bg-card hover:bg-muted/50 hover:border-primary/30 transition-colors text-left group"
          >
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
              <p className="text-sm text-foreground mt-0.5 leading-snug">{s.text}</p>
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}