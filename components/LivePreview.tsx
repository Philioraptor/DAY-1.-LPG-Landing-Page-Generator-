"use client";

import { resolveConfig } from "@/lib/defaults";
import { LandingConfig } from "@/types";

interface LivePreviewProps {
  config: LandingConfig;
}

export function LivePreview({ config }: LivePreviewProps) {
  const resolved = resolveConfig(config);
  const previewFontFamily =
    resolved.font === "Poppins"
      ? "var(--font-poppins), Arial, sans-serif"
      : "var(--font-inter), Arial, sans-serif";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-soft sm:p-4">
      <div
        className="preview-scrollbar max-h-[78vh] overflow-auto rounded-xl border border-slate-200 bg-slate-50"
        style={{ fontFamily: previewFontFamily }}
      >
        <div className="min-h-full">
          <header className="border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur">
            <div className="text-base font-semibold text-slate-900">{resolved.projectName}</div>
          </header>

          <main className="px-4 py-7 sm:px-8">
            <section className="rounded-2xl border border-slate-200 bg-white px-5 py-9 shadow-sm sm:px-8">
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">{resolved.projectName}</h2>
              <p className="mt-4 max-w-xl text-base text-slate-600 sm:text-lg">{resolved.tagline}</p>
              <button
                type="button"
                className="mt-6 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
                style={{ backgroundColor: resolved.primaryColor }}
              >
                {resolved.ctaText}
              </button>
            </section>

            <section className="mt-6 grid gap-3 sm:grid-cols-3">
              {[resolved.feature1, resolved.feature2, resolved.feature3].map((feature, index) => (
                <article
                  key={`${feature}-${index}`}
                  className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm"
                  style={{ borderLeftColor: resolved.primaryColor, borderLeftWidth: 4 }}
                >
                  {feature}
                </article>
              ))}
            </section>
          </main>

          <footer className="border-t border-slate-200 bg-white px-5 py-4 text-sm text-slate-500">© {resolved.projectName}</footer>
        </div>
      </div>
    </section>
  );
}
