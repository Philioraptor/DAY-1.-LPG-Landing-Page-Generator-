"use client";

import { ToastMessage } from "@/types";

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export function Toast({ toasts, onDismiss }: ToastProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:inset-x-auto sm:right-6 sm:top-6 sm:justify-end">
      <div className="flex w-full max-w-sm flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className={`pointer-events-auto rounded-xl border px-4 py-3 text-sm font-medium shadow-soft transition-all ${
              toast.type === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-slate-200 bg-white text-slate-700"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <span>{toast.message}</span>
              <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                className="rounded-md px-1 text-slate-500 transition hover:text-slate-700"
                aria-label="Dismiss toast"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
