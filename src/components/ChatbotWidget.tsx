import { useMemo, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SESSION_KEY = "hd_chat_session";

function formatAssistantText(value: string) {
  return value
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/:\s*•/g, ":\n•")
    .replace(/\s+•\s+/g, "\n• ")
    .replace(/\s+-\s+/g, "\n- ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function getSessionId() {
  const existing = sessionStorage.getItem(SESSION_KEY);
  if (existing) return existing;
  const generated = Math.random().toString(36).slice(2, 14);
  sessionStorage.setItem(SESSION_KEY, generated);
  return generated;
}

export default function ChatbotWidget() {
  const enabled = import.meta.env.VITE_CHATBOT_ENABLED === "true";
  const endpoint = import.meta.env.VITE_CHATBOT_WEBHOOK_URL || "/api/chatbot";
  const botName = import.meta.env.VITE_CHATBOT_BOT_NAME || "Horizon Assistant";

  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hi, I can help with packages, timelines, and website questions. What would you like to know?",
    },
  ]);

  const canSend = input.trim().length > 0 && !isSending;
  const buttonLabel = useMemo(() => (isOpen ? "Close chat" : "Open chat"), [isOpen]);

  if (!enabled) return null;

  const sendMessage = async () => {
    const message = input.trim();
    if (!message || isSending) return;

    setInput("");
    setIsSending(true);
    setMessages((prev) => [...prev, { role: "user", content: message }]);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          session_id: getSessionId(),
          page: window.location.href,
        }),
      });

      const data = await response.json();
      const reply = formatAssistantText(
        String(data.reply || data.response || "Sorry, I could not generate a response right now.")
      );

      setMessages((prev) => [...prev, { role: "assistant", content: String(reply) }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection issue right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-[75]">
      {isOpen && (
        <div className="mb-3 flex h-[460px] w-[min(92vw,360px)] flex-col overflow-hidden rounded-2xl border border-border bg-bg-elev shadow-[0_10px_36px_rgba(0,0,0,0.35)]">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="brand-name text-sm uppercase tracking-[0.12em] text-text">{botName}</p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="focus-ring rounded-full border border-border px-2 py-0.5 text-xs text-text-muted hover:text-accent"
            >
              Close
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-3 py-3 text-sm">
            {messages.map((msg, idx) => (
              <div key={`${msg.role}-${idx}`} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 leading-6 whitespace-pre-wrap ${
                    msg.role === "user"
                      ? "bg-accent text-black"
                      : "border border-border bg-bg text-text"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isSending && <p className="text-xs text-text-muted">Thinking...</p>}
          </div>

          <div className="border-t border-border p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") sendMessage();
                }}
                placeholder="Ask a question"
                className="focus-ring w-full rounded-xl border border-border bg-bg px-3 py-2 text-sm text-text"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={!canSend}
                className="focus-ring rounded-xl bg-accent px-3 py-2 text-sm font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        aria-label={buttonLabel}
        onClick={() => setIsOpen((prev) => !prev)}
        className="focus-ring inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent/35 bg-accent text-black shadow-[0_0_16px_var(--glow)]"
      >
        {isOpen ? (
          "x"
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
            <path
              d="M5 6.5h14a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-8l-4 3v-3H5A1.5 1.5 0 0 1 3.5 16V8A1.5 1.5 0 0 1 5 6.5z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
