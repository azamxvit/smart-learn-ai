import OpenAI from 'openai'

export const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const SYSTEM_PROMPT = `You are SmartLearnAI — an intelligent educational assistant.
Your goal is to help students understand complex topics clearly and effectively.

Guidelines:
- Explain concepts step by step
- Use simple language, avoid unnecessary jargon
- Provide examples when helpful
- If a student is confused, try a different explanation approach
- Encourage curiosity and critical thinking
- Answer in the same language the student uses (Kazakh, Russian or English)`

export async function createChatCompletion(
  messages: { role: 'user' | 'assistant'; content: string }[]
) {
  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ],
    temperature: 0.7,
    max_tokens: 1000,
  })

  return response.choices[0].message.content
}