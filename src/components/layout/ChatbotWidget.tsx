import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquare } from 'lucide-react'

type ChatMessage = {
  role: 'user' | 'assistant'
  content: string
}

const API_BASE = 'https://chat.horizondigitalsey.com/webhook'
const WEBHOOK_TOKEN = 'OK_SECRET44365457d9efd97d50e0f7f06b51343c53679a8cf49a87dbfbf03319e6e87305'

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hi! I'm the Horizon Digital assistant. Ask me about website packages, process, or next steps.",
    },
  ])
  const [sessionId, setSessionId] = useState('')

  const scrollerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let sid = localStorage.getItem('horizon_chat_session')
    if (!sid) {
      sid = `web-${Math.random().toString(36).slice(2, 16)}`
      localStorage.setItem('horizon_chat_session', sid)
    }
    setSessionId(sid)
  }, [])

  useEffect(() => {
    if (!scrollerRef.current) {
      return
    }

    scrollerRef.current.scrollTop = scrollerRef.current.scrollHeight
  }, [messages, loading])

  const sendMessage = async () => {
    const value = input.trim()
    if (!value || loading) {
      return
    }

    setInput('')
    setMessages((prev) => prev.concat({ role: 'user', content: value }))
    setLoading(true)

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-chat-token': WEBHOOK_TOKEN,
        },
        body: JSON.stringify({
          message: value,
          session_id: sessionId,
          source_page: window.location.pathname,
        }),
      })

      const data = (await response.json()) as { reply?: string }

      if (!data.reply) {
        throw new Error('Empty chatbot response')
      }

      setMessages((prev) => prev.concat({ role: 'assistant', content: data.reply ?? '' }))
    } catch {
      setMessages((prev) =>
        prev.concat({
          role: 'assistant',
          content:
            'Sorry, the assistant is unavailable right now. Please use the contact form and we will reply within one to two business days.',
        }),
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed right-4 z-[450] sm:right-6" style={{ bottom: 'max(5.5rem, calc(env(safe-area-inset-bottom) + 4.5rem))' }}>
      <AnimatePresence>
        {open ? (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            className="flex h-[min(520px,70vh)] w-[min(92vw,380px)] flex-col overflow-hidden border border-border-strong bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-border bg-dark px-4 py-3">
              <div>
                <p className="font-syne text-ui-label uppercase text-teal">Horizon Assistant</p>
                <p className="font-dm text-body-caption text-muted">AI chat support</p>
              </div>

              <button type="button" className="font-syne text-ui-label text-muted hover:text-white" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>

            <div ref={scrollerRef} className="flex-1 space-y-3 overflow-y-auto bg-dark p-4">
              {messages.map((message, index) => (
                <div key={`${message.role}-${index}`} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[86%] px-3 py-2 font-dm text-body-xs ${message.role === 'user' ? 'bg-teal text-black' : 'border border-border bg-card text-cream'}`}>
                    {message.content}
                  </div>
                </div>
              ))}

              {loading ? <p className="font-dm text-body-caption text-muted">Thinking...</p> : null}
            </div>

            <div className="border-t border-border bg-card p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault()
                      void sendMessage()
                    }
                  }}
                  placeholder="Ask about packages..."
                  className="flex-1 border border-border-strong bg-surface px-3 py-2 font-dm text-base text-cream placeholder:text-muted-2 focus:border-teal-border focus:outline-none"
                />

                <button type="button" onClick={() => void sendMessage()} className="bg-teal px-4 py-2 font-syne text-ui-btn font-bold text-black hover:opacity-90">
                  Send
                </button>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="mt-3 flex h-12 items-center gap-3 rounded-full bg-teal pl-4 pr-5 font-syne text-ui-btn font-bold text-black shadow-[0_8px_30px_rgb(0,201,167,0.3)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgb(0,201,167,0.4)]"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-black/10">
          <MessageSquare size={14} />
        </div>
        {open ? 'Hide assistant' : 'Ask AI'}
      </motion.button>
    </div>
  )
}
