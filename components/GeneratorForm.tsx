"use client";

import { FontOption, LandingConfig } from "@/types";

interface GeneratorFormProps {
  config: LandingConfig;
  onChange: <K extends keyof LandingConfig>(key: K, value: LandingConfig[K]) => void;
  onCopyHtml: () => void;
  onDownloadHtml: () => void;
  onCopyJson: () => void;
}

const INPUT_CLASS =
  "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus-visible:border-indigo-500";

function parseFontOption(value: string): FontOption {
  return value === "Poppins" ? "Poppins" : "Inter";
}

export function GeneratorForm({ config, onChange, onCopyHtml, onDownloadHtml, onCopyJson }: GeneratorFormProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft sm:p-6">
      <div className="space-y-5">
        <div>
          <label htmlFor="projectName" className="mb-1.5 block text-sm font-medium text-slate-700">
            Project Name
          </label>
          <input
            id="projectName"
            className={INPUT_CLASS}
            type="text"
            value={config.projectName}
            onChange={(event) => onChange("projectName", event.target.value)}
            placeholder="Your Project"
          />
        </div>

        <div>
          <label htmlFor="tagline" className="mb-1.5 block text-sm font-medium text-slate-700">
            Tagline
          </label>
          <input
            id="tagline"
            className={INPUT_CLASS}
            type="text"
            value={config.tagline}
            onChange={(event) => onChange("tagline", event.target.value)}
            placeholder="A short tagline that explains what your product does."
          />
        </div>

        <div>
          <label htmlFor="ctaText" className="mb-1.5 block text-sm font-medium text-slate-700">
            CTA Button Text
          </label>
          <input
            id="ctaText"
            className={INPUT_CLASS}
            type="text"
            value={config.ctaText}
            onChange={(event) => onChange("ctaText", event.target.value)}
            placeholder="Get Started"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="primaryColor" className="mb-1.5 block text-sm font-medium text-slate-700">
              Primary Color
            </label>
            <input
              id="primaryColor"
              type="color"
              className="h-11 w-full cursor-pointer rounded-xl border border-slate-300 bg-white p-1"
              value={config.primaryColor}
              onChange={(event) => onChange("primaryColor", event.target.value)}
            />
          </div>

            <div>
              <label htmlFor="font" className="mb-1.5 block text-sm font-medium text-slate-700">
                Font Selection
              </label>
              <select
                id="font"
                className={INPUT_CLASS}
                value={config.font}
                onChange={(event) => onChange("font", parseFontOption(event.target.value))}
              >
                <option value="Inter">Inter</option>
                <option value="Poppins">Poppins</option>
              </select>
            </div>

        </div>

        <div className="grid gap-4">
          <div>
            <label htmlFor="feature1" className="mb-1.5 block text-sm font-medium text-slate-700">
              Feature 1
            </label>
            <input
              id="feature1"
              className={INPUT_CLASS}
              type="text"
              value={config.feature1}
              onChange={(event) => onChange("feature1", event.target.value)}
              placeholder="Fast setup"
            />
          </div>
          <div>
            <label htmlFor="feature2" className="mb-1.5 block text-sm font-medium text-slate-700">
              Feature 2
            </label>
            <input
              id="feature2"
              className={INPUT_CLASS}
              type="text"
              value={config.feature2}
              onChange={(event) => onChange("feature2", event.target.value)}
              placeholder="Clean design"
            />
          </div>
          <div>
            <label htmlFor="feature3" className="mb-1.5 block text-sm font-medium text-slate-700">
              Feature 3
            </label>
            <input
              id="feature3"
              className={INPUT_CLASS}
              type="text"
              value={config.feature3}
              onChange={(event) => onChange("feature3", event.target.value)}
              placeholder="Easy export"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-2">
        <button
          type="button"
          onClick={onCopyHtml}
          className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Copy HTML
        </button>
        <button
          type="button"
          onClick={onDownloadHtml}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Download HTML
        </button>
        <button
          type="button"
          onClick={onCopyJson}
          className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Copy Shareable JSON
        </button>
      </div>
    </section>
  );
}
