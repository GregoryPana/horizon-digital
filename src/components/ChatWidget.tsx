import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, X, User, Bot, Loader2, CheckCircle2 } from "lucide-react";
import { trackEvent } from "../lib/analytics";
import { siteConfig } from "../data/site";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const API_BASE = "/api";

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
    trackEvent("chat_message_sent", { page_path: window.location.pathname });

    try {
      const response = await fetch(`${API_BASE}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          session_id: sessionId,
          source_page: window.location.pathname,
        }),
      });

      if (!response.ok) throw new Error(`Chat request failed with ${response.status}`);
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
          content: `Sorry, I'm having trouble connecting right now. Please try again later or contact us directly at ${siteConfig.email}.`,
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
      const response = await fetch(`${API_BASE}/lead`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...leadData,
          session_id: sessionId,
          source_page: window.location.pathname,
        }),
      });
      if (!response.ok) throw new Error(`Lead request failed with ${response.status}`);
      trackEvent("generate_lead", {
        lead_source: "chat_widget",
        page_path: window.location.pathname,
        transport_type: "beacon",
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
    <div className="fixed bottom-[4.75rem] right-4 z-[300] hidden font-sans sm:bottom-20 sm:right-6 sm:block">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", damping: 24, stiffness: 320 }}
            className="chat-widget-panel fixed inset-x-4 bottom-[8.5rem] top-4 z-[100] flex flex-col overflow-hidden rounded-2xl sm:bottom-36 sm:right-6 sm:left-auto sm:top-auto sm:h-[min(560px,calc(100dvh-10rem))] sm:w-[380px]"
            role="dialog"
            aria-label="Horizon Digital chat assistant"
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
              role="log"
              aria-live="polite"
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
                        className="w-full rounded-lg border border-white/10 bg-bg px-3 py-2 text-xs text-text placeholder:text-text-dim focus:border-accent focus:outline-none"
                        value={leadData.name}
                        onChange={(e) => setLeadData({...leadData, name: e.target.value})}
                      />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        required
                        className="w-full rounded-lg border border-white/10 bg-bg px-3 py-2 text-xs text-text placeholder:text-text-dim focus:border-accent focus:outline-none"
                        value={leadData.email}
                        onChange={(e) => setLeadData({...leadData, email: e.target.value})}
                      />
                      <input 
                        type="tel" 
                        placeholder="Phone (Optional)" 
                        className="w-full rounded-lg border border-white/10 bg-bg px-3 py-2 text-xs text-text placeholder:text-text-dim focus:border-accent focus:outline-none"
                        value={leadData.phone}
                        onChange={(e) => setLeadData({...leadData, phone: e.target.value})}
                      />
                      <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full rounded-lg bg-accent py-2 text-xs font-semibold text-[#071013] transition-opacity hover:opacity-90 disabled:opacity-50"
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
                  className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-[#071013] transition-all hover:opacity-90 active:scale-90 disabled:opacity-40 sm:h-8 sm:w-8"
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

      {/* Floating Button with Nudge Label */}
      <div className="flex flex-row-reverse items-center gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const opening = !isOpen;
            setIsOpen(opening);
            setShouldPrompt(false);
            if (opening) {
              trackEvent("chat_widget_open", { page_path: window.location.pathname });
            }
          }}
          aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
          className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-[#0a1418] text-accent shadow-[0_2px_12px_rgba(94,209,222,0.12)] transition-all hover:border-accent hover:bg-[#0d1f26] hover:shadow-[0_2px_20px_rgba(94,209,222,0.25)]"
        >
          {isOpen ? <X className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
          {!isOpen && shouldPrompt && (
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-30"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-accent"></span>
            </span>
          )}
        </motion.button>

        <AnimatePresence>
          {!isOpen && shouldPrompt && (
            <motion.div
              initial={{ opacity: 0, x: 16, scale: 0.92 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 16, scale: 0.92 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="chat-prompt-nudge relative whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold pointer-events-none"
            >
              Got questions?
              <span className="chat-prompt-nudge-arrow absolute -right-[5px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
