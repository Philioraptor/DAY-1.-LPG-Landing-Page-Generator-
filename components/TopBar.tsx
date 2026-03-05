"use client";

interface TopBarProps {
  onReset: () => void;
}

export function TopBar({ onReset }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-lg font-semibold text-slate-900">Landing Page Generator</h1>
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          Reset
        </button>
      </div>
    </header>
  );
}
