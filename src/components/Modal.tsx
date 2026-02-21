import { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6">
      <div className="glass w-full max-w-2xl rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-text">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.2em]"
          >
            Close
          </button>
        </div>
        <div className="mt-4 text-sm text-text-muted">{children}</div>
      </div>
    </div>
  );
}
