import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export default function ChatbotPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  // Load chat history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chat_history')
    if (saved) setMessages(JSON.parse(saved))
  }, [])

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages))
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg = { from: 'user', text: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch(`https://api.neoxr.eu/api/gpt-pro?q=${encodeURIComponent(input)}&apikey=yneoxrkey`)
      const data = await res.json()
      const botMsg = { from: 'bot', text: data.data || 'Gagal mendapatkan jawaban.' }
      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      setMessages((prev) => [...prev, { from: 'bot', text: 'Terjadi kesalahan saat memanggil API.' }])
    }
    setLoading(false)
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4 dark:bg-black dark:text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">🤖 Chatbot AI</h1>
      <Card className="mb-4 h-[400px] overflow-y-auto dark:bg-zinc-900">
        <CardContent className="space-y-2 p-4">
          {messages.map((msg, i) => (
            <div key={i} className={`text-sm ${msg.from === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block px-3 py-2 rounded-xl max-w-[80%] ${msg.from === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-zinc-700 dark:text-white text-black'}`}>{msg.text}</span>
            </div>
          ))}
        </CardContent>
      </Card>
      <div className="flex gap-2">
        <Input
          placeholder="Tanyakan sesuatu..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key
