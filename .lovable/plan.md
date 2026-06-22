**Goal:** Update the hero "LOST SOULS SOCIETY" heading to use a more serious, angular typeface and make its color respond to the site's theme toggle.

**Background:**
The hero heading currently uses `font-['Montserrat']` with `font-black` (900). Montserrat has very rounded, geometric letterforms — the "O" is almost a perfect circle and the "S" has smooth curves — which can feel playful rather than serious. The color is also hardcoded to `text-white` with a manual `text-shadow`, so it never changes when the user toggles between light and dark themes.

**Proposed changes**

1. **Switch the heading font to Antonio 700** — The site already loads Antonio via Google Fonts (`font-display`). It is a bold, condensed sans-serif with sharper corners and more angular letterforms than Montserrat, giving it a more serious, industrial feel. The heading will use `font-display font-bold`.

2. **Make the text color theme-responsive** — Replace the hardcoded `text-white` with `text-foreground`. This makes the text dark in light mode and light in dark mode, matching every other text element on the site.

3. **Remove the hardcoded `text-shadow`** — The inline `text-shadow: 0 2px 24px rgba(0,0,0,0.6)` was only needed to make white text readable on the dark video background. With theme-aware colors, it is no longer necessary and would look odd when the text turns dark in light mode.

4. **Add a subtle top gradient overlay for contrast** — Change the hero's existing overlay from `from-transparent via-transparent to-background/50` to `from-background/60 via-transparent to-background/50`. This places a semi-transparent, theme-aware background wash at the top of the hero where the heading sits, ensuring the text is legible in both light and dark modes without hiding the video in the middle of the screen.

**Result:** The heading will look sharper and more serious, and its color will flip between dark and light as the user toggles the site theme, while remaining readable against the video background.