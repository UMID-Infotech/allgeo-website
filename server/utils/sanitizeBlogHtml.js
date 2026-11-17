// server/utils/sanitizeBlogHtml.js
//
// Cleans the HTML coming from CKEditor before it is stored, so that a blog
// can never contain <script> tags, inline event handlers, etc.
import sanitizeHtml from "sanitize-html";

const allowedTags = [
  ...sanitizeHtml.defaults.allowedTags,
  "h1",
  "h2",
  "img",
  "figure",
  "figcaption",
  "span",
  "s",
  "u",
  "sub",
  "sup",
  "hr",
  "mark",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
  "th",
  "td",
  "caption",
  "colgroup",
  "col",
];

export function sanitizeBlogHtml(html = "") {
  return sanitizeHtml(String(html), {
    allowedTags,
    allowedAttributes: {
      "*": ["class", "style"],
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "srcset", "sizes"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan"],
      ol: ["start", "type"],
      li: ["value"],
    },
    allowedStyles: {
      "*": {
        width: [/^\d+(\.\d+)?(px|%)$/],
        height: [/^\d+(\.\d+)?(px|%)$/],
        "text-align": [/^(left|right|center|justify)$/],
        "aspect-ratio": [/^[\d\s./]+$/],
      },
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesByTag: { img: ["http", "https"] },
    transformTags: {
      a: (tagName, attribs) => {
        const next = { ...attribs };
        if (next.target === "_blank") next.rel = "noopener noreferrer";
        return { tagName, attribs: next };
      },
    },
  });
}

// Plain-text version of the HTML (used to build an excerpt automatically).
export function htmlToText(html = "") {
  // Put a space where block elements end so words from different
  // paragraphs/headings are not glued together.
  const spaced = String(html).replace(
    /<\/(p|h[1-6]|li|div|figure|figcaption|blockquote|tr|td|th)>|<br\s*\/?>/gi,
    " ",
  );

  return sanitizeHtml(spaced, { allowedTags: [], allowedAttributes: {} })
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}