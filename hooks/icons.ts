// The bar's small drawings, as SVG for the surfaces that have `Svg`. Text
// glyphs draw badly in a graphical surface's proportional font; the terminal
// gets glyphs instead. Drawn as images, they cannot read the app's theme, so
// each colour is a mid-tone that reads on a light and a dark background.

import type { Pr } from '../types'

const TONE: Record<Pr['state'], string> = {
  open: '#2da44e',
  draft: '#8b949e',
  merged: '#a371f7',
  closed: '#e5534b',
}

// The stem every pull-request glyph stands on, and the head its branch ends in.
const STEM =
  '<circle cx="4" cy="3.5" r="1.75"/><circle cx="4" cy="12.5" r="1.75"/><path d="M4 5.25v5.5"/>'
const HEAD = '<circle cx="12" cy="12.5" r="1.75"/>'

// The shapes Gitea and GitHub draw for each state, so they read at a glance.
const SHAPE: Record<Pr['state'], (tone: string) => string> = {
  // The branch bends over the top into an arrow pointing at the stem.
  open: () =>
    `${STEM}${HEAD}<path d="M12 10.75V6.5A2.5 2.5 0 0 0 9.5 4H7.75M9.5 2 7.5 4l2 2"/>`,
  // The branch is still dots: not ready to go anywhere.
  draft: tone =>
    `${STEM}${HEAD}<circle cx="12" cy="3.5" r="1" fill="${tone}" stroke="none"/>` +
    `<circle cx="12" cy="7.5" r="1" fill="${tone}" stroke="none"/>`,
  // One stem with a branch sweeping out of its top into a third head.
  merged: () =>
    `${STEM}<circle cx="12" cy="8" r="1.75"/><path d="M4.2 5.2C4.8 7.4 7 8 10.25 8"/>`,
  // The branch stops short under a cross.
  closed: () =>
    `${STEM}${HEAD}<path d="M12 10.75V8.5M10.25 2l3.5 3.5M13.75 2l-3.5 3.5"/>`,
}

export const stateSvg = (state: Pr['state']) =>
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="none" ' +
  `stroke="${TONE[state]}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">` +
  `${SHAPE[state](TONE[state])}</svg>`

// A speech bubble.
export const COMMENT_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="none" ' +
  'stroke="#8b949e" stroke-width="1.5" stroke-linejoin="round">' +
  '<path d="M2.75 2.5h10.5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H8.5L5.25 14v-2.5h-2.5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1z"/></svg>'

// One pixel high and stretched to the slot's width; the stroke is the one the
// app's other band rows draw their lines in, light and dark.
export const RULE_SVG =
  '<svg xmlns="http://www.w3.org/2000/svg" width="2400" height="1" viewBox="0 0 2400 1" preserveAspectRatio="none">' +
  '<style>rect{fill:#1f1e1d;fill-opacity:.12}@media (prefers-color-scheme:dark){rect{fill:#fff;fill-opacity:.14}}</style>' +
  '<rect width="2400" height="1"/></svg>'

// Nothing to see: a clear rectangle whose <title> is the mouseover text.
export const tipSvg = (title: string, width: number) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="20" viewBox="0 0 ${width} 20">` +
  `<title>${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</title>` +
  `<rect width="${width}" height="20" fill="#000" fill-opacity="0"/></svg>`
