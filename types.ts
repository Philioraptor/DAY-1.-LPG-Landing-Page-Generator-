export type FontOption = "Inter" | "Poppins";

export interface LandingConfig {
  projectName: string;
  tagline: string;
  ctaText: string;
  primaryColor: string;
  font: FontOption;
  feature1: string;
  feature2: string;
  feature3: string;
}

export interface ResolvedLandingConfig {
  projectName: string;
  tagline: string;
  ctaText: string;
  primaryColor: string;
  font: FontOption;
  feature1: string;
  feature2: string;
  feature3: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type?: "success" | "error";
}
