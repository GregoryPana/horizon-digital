/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CHATBOT_ENABLED?: string;
  readonly VITE_CHATBOT_WEBHOOK_URL?: string;
  readonly VITE_CHATBOT_BOT_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
