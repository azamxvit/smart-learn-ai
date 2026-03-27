import Groq from 'groq-sdk'

export const SYSTEM_PROMPT = `You are SmartLearnAI...`

export async function createChatCompletion(
  messages: { role: 'user' | 'assistant'; content: string }[]
) {
  const client = new Groq({
    apiKey: process.env.GROQ_API_KEY ?? '',
  })

  console.log('Using key:', process.env.GROQ_API_KEY?.slice(0, 10))

  const response = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ],
    temperature: 0.7,
    max_tokens: 1024,
  })

  return response.choices[0].message.content
}