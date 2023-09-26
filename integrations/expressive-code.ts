import type { AstroIntegration } from "astro";
import astroExpressiveCode from "astro-expressive-code";

export const tqblogExpressiveCode = (): AstroIntegration =>
  astroExpressiveCode({
    theme: "one-dark-pro",
    styleOverrides: {},
    frames: {
      showCopyToClipboardButton: true,
      styleOverrides: {
        frameBoxShadowCssValue: "none",
      },
    },
  });
