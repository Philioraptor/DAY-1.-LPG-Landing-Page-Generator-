"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GeneratorForm } from "@/components/GeneratorForm";
import { LivePreview } from "@/components/LivePreview";
import { Toast } from "@/components/Toast";
import { TopBar } from "@/components/TopBar";
import { DEFAULT_CONFIG } from "@/lib/defaults";
import { generateHtml } from "@/lib/generateHtml";
import { clearConfig, loadConfig, saveConfig, saveShareableJson } from "@/lib/storage";
import { LandingConfig, ToastMessage } from "@/types";

function downloadHtml(html: string) {
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "index.html";
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export default function Page() {
  const [config, setConfig] = useState<LandingConfig>(DEFAULT_CONFIG);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const saveTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const stored = loadConfig();
    if (stored) {
      setConfig(stored);
    }
  }, []);

  useEffect(() => {
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = window.setTimeout(() => {
      saveConfig(config);
    }, 250);

    return () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, [config]);

  const showToast = useCallback((message: string, type: ToastMessage["type"] = "success") => {
    const id = `${Date.now()}-${Math.random()}`;
    const toast: ToastMessage = { id, message, type };

    setToasts((current) => [...current, toast]);

    window.setTimeout(() => {
      setToasts((current) => current.filter((item) => item.id !== id));
    }, 2000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const handleChange = useCallback(<K extends keyof LandingConfig>(key: K, value: LandingConfig[K]) => {
    setConfig((current) => ({ ...current, [key]: value }));
  }, []);

  const htmlOutput = useMemo(() => generateHtml(config), [config]);

  const handleReset = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    clearConfig();
    showToast("Reset complete");
  }, [showToast]);

  const handleCopyHtml = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(htmlOutput);
      showToast("Copied!");
    } catch {
      showToast("Failed to copy HTML", "error");
    }
  }, [htmlOutput, showToast]);

  const handleDownloadHtml = useCallback(() => {
    try {
      downloadHtml(htmlOutput);
      showToast("Downloaded!");
    } catch {
      showToast("Failed to download HTML", "error");
    }
  }, [htmlOutput, showToast]);

  const handleCopyJson = useCallback(async () => {
    try {
      saveShareableJson(config);
      const serialized = JSON.stringify(config, null, 2);
      await navigator.clipboard.writeText(serialized);
      showToast("JSON copied!");
    } catch {
      showToast("Failed to copy JSON", "error");
    }
  }, [config, showToast]);

  return (
    <div className="min-h-screen">
      <TopBar onReset={handleReset} />

      <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[400px_minmax(0,1fr)] lg:px-8">
        <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-auto lg:pr-1">
          <GeneratorForm
            config={config}
            onChange={handleChange}
            onCopyHtml={handleCopyHtml}
            onDownloadHtml={handleDownloadHtml}
            onCopyJson={handleCopyJson}
          />
        </div>

        <div>
          <LivePreview config={config} />
        </div>
      </main>

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
