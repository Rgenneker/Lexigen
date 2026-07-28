/**
 * Consistent pill colours for every supported language.
 * Each entry has Tailwind bg/text/border classes for the coloured state.
 */
export const LANGUAGE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "English":           { bg: "bg-emerald-100 dark:bg-emerald-900/40",   text: "text-emerald-700 dark:text-emerald-300",   border: "border-emerald-300 dark:border-emerald-700" },
  "Afrikaans":         { bg: "bg-violet-100 dark:bg-violet-900/40",      text: "text-violet-700 dark:text-violet-300",      border: "border-violet-300 dark:border-violet-700" },
  "Zulu":              { bg: "bg-purple-100 dark:bg-purple-900/40",      text: "text-purple-700 dark:text-purple-300",      border: "border-purple-300 dark:border-purple-700" },
  "Xhosa":             { bg: "bg-fuchsia-100 dark:bg-fuchsia-900/40",    text: "text-fuchsia-700 dark:text-fuchsia-300",    border: "border-fuchsia-300 dark:border-fuchsia-700" },
  "French":            { bg: "bg-blue-100 dark:bg-blue-900/40",          text: "text-blue-700 dark:text-blue-300",          border: "border-blue-300 dark:border-blue-700" },
  "Spanish":           { bg: "bg-amber-100 dark:bg-amber-900/40",        text: "text-amber-700 dark:text-amber-300",        border: "border-amber-300 dark:border-amber-700" },
  "Portuguese":        { bg: "bg-lime-100 dark:bg-lime-900/40",          text: "text-lime-700 dark:text-lime-300",          border: "border-lime-300 dark:border-lime-700" },
  "German":            { bg: "bg-slate-100 dark:bg-slate-800/60",        text: "text-slate-700 dark:text-slate-300",        border: "border-slate-300 dark:border-slate-600" },
  "Dutch":             { bg: "bg-orange-100 dark:bg-orange-900/40",      text: "text-orange-700 dark:text-orange-300",      border: "border-orange-300 dark:border-orange-700" },
  "Italian":           { bg: "bg-red-100 dark:bg-red-900/40",            text: "text-red-700 dark:text-red-300",            border: "border-red-300 dark:border-red-700" },
  "Arabic":            { bg: "bg-teal-100 dark:bg-teal-900/40",          text: "text-teal-700 dark:text-teal-300",          border: "border-teal-300 dark:border-teal-700" },
  "Farsi":             { bg: "bg-indigo-100 dark:bg-indigo-900/40",      text: "text-indigo-700 dark:text-indigo-300",      border: "border-indigo-300 dark:border-indigo-700" },
  "Russian":           { bg: "bg-rose-100 dark:bg-rose-900/40",          text: "text-rose-700 dark:text-rose-300",          border: "border-rose-300 dark:border-rose-700" },
  "Bahasa Malay":      { bg: "bg-cyan-100 dark:bg-cyan-900/40",          text: "text-cyan-700 dark:text-cyan-300",          border: "border-cyan-300 dark:border-cyan-700" },
  "Vietnamese":        { bg: "bg-pink-100 dark:bg-pink-900/40",          text: "text-pink-700 dark:text-pink-300",          border: "border-pink-300 dark:border-pink-700" },
  "Tagalog":           { bg: "bg-yellow-100 dark:bg-yellow-900/40",      text: "text-yellow-700 dark:text-yellow-300",      border: "border-yellow-300 dark:border-yellow-700" },
  "Japanese":          { bg: "bg-red-100 dark:bg-red-900/40",            text: "text-red-600 dark:text-red-400",            border: "border-red-200 dark:border-red-800" },
  "Cantonese":         { bg: "bg-sky-100 dark:bg-sky-900/40",            text: "text-sky-700 dark:text-sky-300",            border: "border-sky-300 dark:border-sky-700" },
  "Chinese (Mandarin)":{ bg: "bg-orange-100 dark:bg-orange-900/40",      text: "text-orange-600 dark:text-orange-300",      border: "border-orange-200 dark:border-orange-700" },
  // PlaybookSection uses "Mandarin" shorthand
  "Mandarin":          { bg: "bg-orange-100 dark:bg-orange-900/40",      text: "text-orange-600 dark:text-orange-300",      border: "border-orange-200 dark:border-orange-700" },
};

export function langColor(lang: string) {
  return LANGUAGE_COLORS[lang] ?? { bg: "bg-muted", text: "text-muted-foreground", border: "border-border" };
}
