import { LandingConfig, ResolvedLandingConfig } from "@/types";

export const PLACEHOLDERS = {
  projectName: "Your Project",
  tagline: "A short tagline that explains what your product does.",
  ctaText: "Get Started",
  feature1: "Fast setup",
  feature2: "Clean design",
  feature3: "Easy export",
} as const;

export const DEFAULT_CONFIG: LandingConfig = {
  projectName: "",
  tagline: "",
  ctaText: "",
  primaryColor: "#4f46e5",
  font: "Inter",
  feature1: "",
  feature2: "",
  feature3: "",
};

export const STORAGE_KEY = "landing-page-generator-config-v1";

export function resolveConfig(config: LandingConfig): ResolvedLandingConfig {
  return {
    projectName: config.projectName.trim() || PLACEHOLDERS.projectName,
    tagline: config.tagline.trim() || PLACEHOLDERS.tagline,
    ctaText: config.ctaText.trim() || PLACEHOLDERS.ctaText,
    primaryColor: config.primaryColor,
    font: config.font,
    feature1: config.feature1.trim() || PLACEHOLDERS.feature1,
    feature2: config.feature2.trim() || PLACEHOLDERS.feature2,
    feature3: config.feature3.trim() || PLACEHOLDERS.feature3,
  };
}
