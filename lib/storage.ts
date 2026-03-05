import { DEFAULT_CONFIG, STORAGE_KEY } from "@/lib/defaults";
import { FontOption, LandingConfig } from "@/types";

const SHAREABLE_JSON_KEY = "landing-page-generator-shareable-json";

function isFontOption(value: unknown): value is FontOption {
  return value === "Inter" || value === "Poppins";
}

function sanitizeConfig(input: unknown): LandingConfig | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const value = input as Record<string, unknown>;

  return {
    projectName: typeof value.projectName === "string" ? value.projectName : DEFAULT_CONFIG.projectName,
    tagline: typeof value.tagline === "string" ? value.tagline : DEFAULT_CONFIG.tagline,
    ctaText: typeof value.ctaText === "string" ? value.ctaText : DEFAULT_CONFIG.ctaText,
    primaryColor: typeof value.primaryColor === "string" ? value.primaryColor : DEFAULT_CONFIG.primaryColor,
    font: isFontOption(value.font) ? value.font : DEFAULT_CONFIG.font,
    feature1: typeof value.feature1 === "string" ? value.feature1 : DEFAULT_CONFIG.feature1,
    feature2: typeof value.feature2 === "string" ? value.feature2 : DEFAULT_CONFIG.feature2,
    feature3: typeof value.feature3 === "string" ? value.feature3 : DEFAULT_CONFIG.feature3,
  };
}

export function loadConfig(): LandingConfig | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    return sanitizeConfig(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function saveConfig(config: LandingConfig): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    return true;
  } catch {
    return false;
  }
}

export function saveShareableJson(config: LandingConfig): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.setItem(SHAREABLE_JSON_KEY, JSON.stringify(config));
    return true;
  } catch {
    return false;
  }
}

export function clearConfig(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    window.localStorage.removeItem(STORAGE_KEY);
    window.localStorage.removeItem(SHAREABLE_JSON_KEY);
    return true;
  } catch {
    return false;
  }
}
