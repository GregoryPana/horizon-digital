import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, User, Bot, Loader2, CheckCircle2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const API_BASE = "https://chat.horizondigitalsey.com/webhook";
const WEBHOOK_TOKEN = "OK_SECRET44365457d9efd97d50e0f7f06b51343c53679a8cf49a87dbfbf03319e6e87305";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadData, setLeadData] = useState({ name: "", email: "", phone: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [shouldPrompt, setShouldPrompt] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize session ID
    let sid = localStorage.getItem("horizon_chat_session");
    if (!sid) {
      sid = "web-" + Math.random().toString(36).substring(2, 15);
      localStorage.setItem("horizon_chat_session", sid);
    }
    setSessionId(sid);

    // Initial greeting
    setMessages([
      {
        role: "assistant",
        content: "Hi! I'm the Horizon Digital assistant. How can I help you today?",
      },
    ]);

    // Nudge user after 12 seconds
    const timer = setTimeout(() => {
      setShouldPrompt(true);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, showLeadForm]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-chat-token": WEBHOOK_TOKEN,
        },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionId,
          source_page: window.location.pathname,
        }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
        
        // Check if bot wants us to capture a lead
        if (data.lead_trigger) {
          setTimeout(() => setShowLeadForm(true), 1500);
        }
      } else {
        throw new Error("Empty response");
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, I'm having trouble connecting right now. Please try again later or contact us directly at horizondigitalsey@gmail.com.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadData.name || !leadData.email) return;

    setIsLoading(true);
    try {
      await fetch(`${API_BASE}/lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-chat-token": WEBHOOK_TOKEN,
        },
        body: JSON.stringify({
          ...leadData,
          session_id: sessionId,
          source_page: window.location.pathname,
        }),
      });
      setLeadSubmitted(true);
      setTimeout(() => {
        setShowLeadForm(false);
        setLeadSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Lead submission failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 sm:right-6 sm:left-auto z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-x-4 bottom-24 top-4 z-[100] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-bg-elev/80 shadow-2xl backdrop-blur-xl sm:bottom-24 sm:right-6 sm:left-auto sm:top-auto sm:h-[550px] sm:w-[400px] md:h-[600px] lg:h-[650px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 bg-accent/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="relative h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text uppercase tracking-wider">Horizon Assistant</h3>
                  <p className="text-[10px] text-text-muted">Always active • AI Powered</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-text-muted transition-colors hover:bg-white/10 hover:text-text active:scale-95"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth overscroll-contain"
            >
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex max-w-[85%] items-start gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 ${msg.role === "user" ? "bg-accent text-[#080C11]" : "bg-bg-elev text-accent"}`}>
                      {msg.role === "user" ? <User size={14} /> : <Bot size={14} />}
                    </div>
                    <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                      msg.role === "user" 
                      ? "bg-accent text-[#080C11] font-medium rounded-tr-none shadow-lg shadow-accent/20" 
                      : "bg-white/5 text-text rounded-tl-none border border-white/5"
                    }`}>
                      {msg.content.split('\n').map((line, i) => (
                        <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-2 rounded-2xl bg-white/5 px-4 py-2.5 text-text-muted border border-white/5">
                    <Loader2 size={14} className="animate-spin" />
                    <span className="text-xs">Horizon is thinking...</span>
                  </div>
                </div>
              )}

              {showLeadForm && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-accent/20 bg-accent/5 p-4"
                >
                  {!leadSubmitted ? (
                    <form onSubmit={handleLeadSubmit} className="space-y-3">
                      <p className="text-xs font-medium text-text">I'd love to connect you with our team! Could you share your details?</p>
                      <input 
                        type="text" 
                        placeholder="Your Name" 
                        required
                        className="w-full rounded-lg border border-white/10 bg-bg px-3 py-2 text-xs text-text focus:border-accent focus:outline-none"
                        value={leadData.name}
                        onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                      />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        required
                        className="w-full rounded-lg border border-white/10 bg-bg px-3 py-2 text-xs text-text focus:border-accent focus:outline-none"
                        value={leadData.email}
                        onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone (Optional)" 
                        className="w-full rounded-lg border border-white/10 bg-bg px-3 py-2 text-xs text-text focus:border-accent focus:outline-none"
                        value={leadData.phone}
                        onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                      />
                      <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-lg bg-accent py-2 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                      >
                        Request Connection
                      </button>
                    </form>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4 text-center">
                      <CheckCircle2 size={32} className="mb-2 text-accent" />
                      <p className="text-sm font-semibold text-text">Sent successfully!</p>
                      <p className="text-xs text-text-muted">Our team will be in touch soon.</p>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-white/5 bg-bg/95 p-4 backdrop-blur-md pb-[calc(1rem+env(safe-area-inset-bottom))]">
              <div className="relative flex items-center">
                <input
                  type="text"
                  inputMode="text"
                  placeholder="Ask about our services..."
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 pr-12 text-base text-text placeholder:text-text-muted focus:border-accent/50 focus:outline-none sm:py-3 sm:text-sm"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  aria-label="Send message"
                  className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white transition-all hover:opacity-90 active:scale-90 disabled:opacity-40 sm:h-8 sm:w-8"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-text-muted uppercase tracking-tighter">
                © {new Date().getFullYear()} Horizon Digital • Seychelles
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button with Nudge Animation */}
      <div className="relative">
        <AnimatePresence>
          {!isOpen && shouldPrompt && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{ 
                    opacity: 0, 
                    scale: [0, 1, 0.5], 
                    x: (i % 2 === 0 ? 1 : -1) * (Math.random() * 50 + 20),
                    y: (i < 3 ? -1 : 1) * (Math.random() * 50 + 20)
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    repeatDelay: 2,
                    delay: i * 0.1 
                  }}
                  className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent pr-1"
                />
              ))}
            </>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={(!isOpen && shouldPrompt) ? {
            rotate: [0, -10, 10, -10, 10, 0],
            transition: { 
              duration: 0.5, 
              repeat: Infinity, 
              repeatDelay: 4 
            }
          } : {}}
          onClick={() => {
            setIsOpen(!isOpen);
            setShouldPrompt(false);
          }}
          aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
          className="relative flex h-12 w-12 md:h-[4.5rem] md:w-[4.5rem] items-center justify-center rounded-full bg-accent text-[#080C11] shadow-[0_0_20px_rgba(56,189,248,0.4)] shadow-accent/30 transition-shadow hover:shadow-[0_0_25px_rgba(56,189,248,0.6)]"
        >
          {isOpen ? <X className="w-5 h-5 md:w-7 md:h-7" /> : <MessageSquare className="w-5 h-5 md:w-7 md:h-7" />}
          {!isOpen && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-4 w-4 rounded-full bg-accent shadow-sm"></span>
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
}
