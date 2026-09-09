# Design System & Aesthetic Guidelines

This document outlines the strict visual and UI standards for the **impress-demo-app** enterprise RBAC dashboard.

---

## 1. Design Philosophy: Clean Enterprise Grade

The dashboard must look **clean, crisp, data-dense, and professional**—similar to modern enterprise tools like Linear, GitHub Enterprise, Cloudflare, or Vercel.

### Prohibited Patterns

- ❌ **No flashy purple/magenta gradients or AI-style neon glow effects.**
- ❌ **No saturated multicolor background blobs or noisy backgrounds.**
- ❌ **No overly decorative animations that slow down workflow.**
- ❌ **No inconsistent ad-hoc button and input styles.**

---

## 2. Color Palette & Tokens (Tailwind CSS)

### Neutral Base (Dark & Light)

- **Backgrounds**: `bg-slate-50` / `bg-white` (Light), `bg-slate-950` / `bg-slate-900` (Dark)
- **Card / Panel Surfaces**: `bg-white` (Light), `bg-slate-900` / `bg-slate-800/60` (Dark)
- **Borders & Dividers**: `border-slate-200` (Light), `border-slate-800` (Dark)
- **Primary Text**: `text-slate-900` (Light), `text-slate-100` (Dark)
- **Muted / Secondary Text**: `text-slate-500` (Light), `text-slate-400` (Dark)

### Functional & Semantic Accents

- **Primary Action Accent**: Corporate Blue / Indigo (`bg-blue-600 hover:bg-blue-700` or `bg-indigo-600 hover:bg-indigo-700`)
- **Success / Active**: Emerald (`emerald-600`, `bg-emerald-500/10 text-emerald-600 dark:text-emerald-400`)
- **Pending / Warning**: Amber (`amber-600`, `bg-amber-500/10 text-amber-600 dark:text-amber-400`)
- **Danger / Inactive / Revoked**: Rose / Red (`rose-600`, `bg-rose-500/10 text-rose-600 dark:text-rose-400`)
- **Info / Neutral Tag**: Slate / Sky (`sky-600`, `bg-slate-500/10 text-slate-600 dark:text-slate-300`)

---

## 3. Typography & Spacing

- **Font Family**: Inter, Geist, or standard system sans-serif (`font-sans`).
- **Hierarchy**:
  - Page Titles: `text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-100`
  - Section Headings: `text-lg font-medium text-slate-800 dark:text-slate-200`
  - Body Text: `text-sm text-slate-600 dark:text-slate-400`
  - Captions / Metadata: `text-xs text-slate-500`
  - Code / Tokens / IDs: `font-mono text-xs`

---

## 4. Layout & Surface Patterns

- **Tables**: Clean border-collapsed rows with subtle hover states (`hover:bg-slate-50/50 dark:hover:bg-slate-800/40`), sticky header, and distinct column headers.
- **Cards**: Minimal border (`border border-slate-200 dark:border-slate-800`), rounded corners (`rounded-lg` or `rounded-xl`), soft shadow (`shadow-xs` or `shadow-sm`).
- **Forms & Inputs**: Consistent `h-9` or `h-10` heights, subtle border, focused ring (`focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600`), and accessible placeholder colors.
