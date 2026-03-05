import { resolveConfig } from "@/lib/defaults";
import { LandingConfig } from "@/types";

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function generateHtml(config: LandingConfig): string {
  const resolved = resolveConfig(config);
  const fontFamily = resolved.font === "Poppins" ? "'Poppins', Arial, sans-serif" : "'Inter', Arial, sans-serif";
  const fontHref =
    resolved.font === "Poppins"
      ? "https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
      : "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(resolved.projectName)}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="${fontHref}" rel="stylesheet" />
    <style>
      :root {
        --primary: ${resolved.primaryColor};
        --text: #0f172a;
        --muted: #475569;
        --border: #e2e8f0;
        --bg: #f8fafc;
        --card: #ffffff;
      }

      * { box-sizing: border-box; }

      body {
        margin: 0;
        font-family: ${fontFamily};
        background: var(--bg);
        color: var(--text);
        line-height: 1.5;
      }

      .container {
        width: min(1100px, 92vw);
        margin: 0 auto;
      }

      .nav {
        border-bottom: 1px solid var(--border);
        background: rgba(255, 255, 255, 0.88);
        backdrop-filter: blur(8px);
      }

      .nav-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 68px;
      }

      .brand {
        font-weight: 700;
        font-size: 1.05rem;
      }

      .hero {
        padding: 64px 0 34px;
      }

      .hero-panel {
        border: 1px solid var(--border);
        border-radius: 18px;
        padding: 42px 26px;
        background: var(--card);
        box-shadow: 0 18px 38px rgba(15, 23, 42, 0.08);
      }

      h1 {
        margin: 0;
        font-size: clamp(2rem, 6vw, 3.35rem);
        line-height: 1.1;
      }

      p {
        margin: 14px 0 0;
        color: var(--muted);
        font-size: 1.05rem;
      }

      .cta {
        display: inline-block;
        margin-top: 24px;
        border: 0;
        border-radius: 12px;
        background: var(--primary);
        color: #fff;
        padding: 12px 20px;
        font-weight: 600;
        text-decoration: none;
      }

      .features {
        padding: 14px 0 56px;
      }

      .feature-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 14px;
      }

      .feature {
        border: 1px solid var(--border);
        border-left: 5px solid var(--primary);
        border-radius: 14px;
        background: var(--card);
        padding: 16px;
        box-shadow: 0 10px 24px rgba(15, 23, 42, 0.06);
      }

      .footer {
        border-top: 1px solid var(--border);
        color: var(--muted);
        padding: 24px 0 34px;
        font-size: 0.95rem;
      }

      @media (max-width: 820px) {
        .hero {
          padding-top: 44px;
        }

        .hero-panel {
          padding: 28px 18px;
        }

        .feature-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <header class="nav">
      <div class="container nav-inner">
        <div class="brand">${escapeHtml(resolved.projectName)}</div>
      </div>
    </header>

    <main>
      <section class="hero">
        <div class="container">
          <div class="hero-panel">
            <h1>${escapeHtml(resolved.projectName)}</h1>
            <p>${escapeHtml(resolved.tagline)}</p>
            <a href="#" class="cta">${escapeHtml(resolved.ctaText)}</a>
          </div>
        </div>
      </section>

      <section class="features">
        <div class="container feature-grid">
          <article class="feature">${escapeHtml(resolved.feature1)}</article>
          <article class="feature">${escapeHtml(resolved.feature2)}</article>
          <article class="feature">${escapeHtml(resolved.feature3)}</article>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container">&copy; ${escapeHtml(resolved.projectName)}</div>
    </footer>
  </body>
</html>
`;
}
