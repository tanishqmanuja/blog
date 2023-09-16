import astroExpressiveCode from "astro-expressive-code";

export const tqblogExpressiveCode = () =>
	astroExpressiveCode({
		theme: "one-dark-pro",
    styleOverrides: {
      
    },
    frames: {
      styleOverrides: {
        frameBoxShadowCssValue: "none",
      }
    },
	});