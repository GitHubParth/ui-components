# AGENTS.md / Context & Architecture Guide

This document provides context, core purpose, tech stack, design standards, and architectural guidelines for AI coding assistants (Antigravity, Claude, etc.) interacting with the **impress-demo-app** codebase.

---

## 1. Project Overview & Business Purpose

- **Application Name**: `impress-demo-app`
- **Application Type**: **Enterprise Role-Based Access Control (RBAC) Dashboard System** for organizations.
- **Core Purpose**:
  - Manage users, roles, permissions, access policies, audit trails, and organization units.
  - Deliver a secure, streamlined, data-dense enterprise dashboard experience.
  - Render permission-aware UI elements (features, action buttons, navigation tabs) conditionally based on user roles (e.g., `Super Admin`, `Org Admin`, `Compliance Officer`, `Manager`, `Viewer`).

---

## 2. Tech Stack & Styling Architecture

| Layer | Technology / Tool | Specification |
| :--- | :--- | :--- |
| **Runtime / Bundler** | [Vite](https://vite.dev/) | Fast build & HMR |
| **Framework** | [React 19](https://react.dev/) | Functional Components & Hooks |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | Strict Mode |
| **Styling** | **Tailwind CSS** | Utility-first styling for clean, consistent UI |
| **Icons** | Lucide React / Modern SVG Icons | Crisp, enterprise-grade iconography |
| **Code Quality** | ESLint 9+ with `typescript-eslint` | Clean code standards |

---

## 3. Design System & Aesthetics (Strict Enterprise Standards)

### A. Color Palette & Tone
- **Professional & Clean**: Use neutral, corporate palettes (Slate, Zinc, Neutral, Cool Gray).
- **Primary Accents**: Crisp enterprise blues, indigo accents, or neutral dark accents for active states.
- **Strict Prohibitions**:
  - **NO unnecessary purple/magenta gradients or AI-style neon glow effects.**
  - **NO gaudy, high-saturation multicolored backgrounds.**
  - Keep gradients minimal and subtle if used at all (e.g., subtle card borders or neutral slate backgrounds).

### B. Enterprise UI Characteristics
- **Visual Hierarchy**: Clear typography, subtle border dividers (`border-slate-200` / `border-slate-800`), clean table layouts, and balanced data density.
- **Status & Badges**: Subtle, semantic status indicators (Success/Active: `emerald`, Pending/Warning: `amber`, Inactive/Danger: `rose`, Info: `sky`).
- **Dark/Light Mode**: Polished, professional contrast without harsh borders.

---

## 4. Component Architecture & Reusability

Always build and utilize **reusable, modular components** to prevent code duplication.

### Suggested Project Structure:
```text
impress-demo-app/
├── public/
├── src/
│   ├── assets/             # Media and static assets
│   ├── components/         # Reusable atomic & UI components
│   │   ├── common/         # Button, Input, Modal, Badge, Dropdown, Table, Card, Tooltip
│   │   ├── layout/         # Sidebar, Navbar, PageHeader, Container, Breadcrumbs
│   │   └── rbac/           # PermissionGate, RoleBadge, AccessGuard
│   ├── features/           # Domain-specific feature modules
│   │   ├── dashboard/      # Metrics, activity overview, quick actions
│   │   ├── users/          # User management, invite, profile view
│   │   ├── roles/          # Role matrix, permission toggles, custom roles
│   │   ├── audit-logs/     # Compliance and security audit log viewer
│   │   └── settings/       # Organization and security settings
│   ├── hooks/              # Custom hooks (e.g., useAuth, usePermission, useDebounce)
│   ├── context/            # Global context (AuthContext, RBACContext, ThemeContext)
│   ├── types/              # Centralized TypeScript definitions (User, Role, Permission, etc.)
│   ├── utils/              # Helper functions, formatting, RBAC evaluation logic
│   ├── App.tsx             # Root router & layout orchestrator
│   ├── index.css           # Tailwind directives & base overrides
│   └── main.tsx            # Application entry point
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
├── package.json
└── vite.config.ts
```

---

## 5. RBAC Implementation Guidelines

1. **Permission Modeling**:
   - Model permissions granularly (e.g., `users:read`, `users:create`, `users:update`, `users:delete`, `roles:manage`, `audit:export`).
2. **Permission Guard Components**:
   - Create reusable wrappers like `<PermissionGate permission="users:create">` to conditionally render action buttons and sections.
3. **Route & View Protection**:
   - Protect views using route-level guards (`<RoleRoute allowedRoles={[...]} />`).
4. **Mock Data / Demo State**:
   - Provide an interactive switcher in the header/settings to easily switch user roles during demos (e.g., toggle between `Super Admin`, `Department Manager`, and `Read-only Analyst`).

---

## 6. Key Commands for AI Agents

- **Start Dev Server**: `npm run dev`
- **Typecheck & Production Build**: `npm run build`
- **Lint Code**: `npm run lint`

---

## 7. Rules for AI Agents

1. **Respect Design Constraint**: Do not introduce flashy, bright purple gradients or cartoonish UI. Keep it sleek, professional, and enterprise-grade.
2. **Component Reuse First**: When building a new screen or view, reuse existing buttons, tables, badges, modals, and layouts rather than redefining raw markup.
3. **Strict TypeScript**: Maintain strict types for all RBAC structures, state hooks, and component props.
4. **Validation**: Always ensure `npm run build` passes with zero type or build errors after making modifications.
