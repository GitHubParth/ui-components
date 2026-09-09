# Overview & Architecture Guide

This guide outlines the system goals, technology stack, directory structure, and execution rules for AI assistants (Antigravity, Claude, etc.) working on the **impress-demo-app**.

---

## 1. Project Overview & Business Purpose

- **Application Name**: `impress-demo-app`
- **Application Type**: **Enterprise Role-Based Access Control (RBAC) Dashboard System**
- **Core Purpose**:
  - Securely manage users, roles, permissions, access policies, audit trails, and organizational units.
  - Deliver a high-density, streamlined enterprise dashboard.
  - Dynamically render permission-aware UI elements (features, action buttons, navigation tabs) based on assigned roles (e.g., `Super Admin`, `Org Admin`, `Compliance Officer`, `Manager`, `Viewer`).

---

## 2. Tech Stack & Tools

| Layer                     | Technology                                    | Description                                            |
| :------------------------ | :-------------------------------------------- | :----------------------------------------------------- |
| **Bundler & Dev Server**  | [Vite](https://vite.dev/)                     | High-performance build & hot module replacement        |
| **UI Library**            | [React 19](https://react.dev/)                | Functional Components & Hooks                          |
| **Language**              | [TypeScript](https://www.typescriptlang.org/) | Strict Type Safety                                     |
| **Styling**               | **Tailwind CSS**                              | Utility-first styling for consistent enterprise design |
| **Iconography**           | Lucide React / Modern SVG Icons               | Clean, professional enterprise icons                   |
| **Linter / Code Quality** | ESLint 9+ with `typescript-eslint`            | Code quality & consistency                             |

---

## 3. Project Directory Structure

```text
impress-demo-app/
├── .agents/                 # AI agent documentation and guidelines
│   ├── AGENTS.md            # Master context & guidelines entry point
│   ├── DESIGN_SYSTEM.md     # Styling, Tailwind tokens, and aesthetic constraints
│   ├── RBAC_SPEC.md         # Role & permission architecture specification
│   └── COMPONENT_GUIDE.md   # Reusable component patterns & conventions
├── public/                  # Static assets
├── src/
│   ├── assets/              # Media, SVGs, and icon assets
│   ├── components/          # Reusable atomic & layout components
│   │   ├── common/          # Button, Input, Modal, Badge, Dropdown, Table, Card, Tooltip
│   │   ├── layout/          # Sidebar, Navbar, PageHeader, Container, Breadcrumbs
│   │   └── rbac/            # PermissionGate, RoleBadge, AccessGuard
│   ├── features/            # Domain-specific feature modules
│   │   ├── dashboard/       # Metrics, activity overview, quick actions
│   │   ├── users/           # User management, invite, profile view
│   │   ├── roles/           # Role matrix, permission toggles, custom roles
│   │   ├── audit-logs/      # Compliance and security audit log viewer
│   │   └── settings/        # Organization and security settings
│   ├── hooks/               # Custom hooks (e.g., useAuth, usePermission, useDebounce)
│   ├── context/             # Global context (AuthContext, RBACContext, ThemeContext)
│   ├── types/               # Centralized TypeScript definitions
│   ├── utils/               # Helpers, formatting, RBAC evaluation logic
│   ├── App.tsx              # Root router & layout orchestrator
│   ├── index.css            # Tailwind directives & base overrides
│   └── main.tsx             # Application entry point
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── package.json
└── vite.config.ts
```

---

## 4. Key Agent Commands

- **Development Server**: `npm run dev`
- **Typecheck & Production Build**: `npm run build`
- **Linting**: `npm run lint`

---

## 5. Core Rules for AI Agents

1. **Enterprise Aesthetics**: Always follow [DESIGN_SYSTEM.md](file:///d:/Projects/impress-demo-app/.agents/DESIGN_SYSTEM.md). Avoid unnecessary purple/magenta gradients, glow effects, or gaudy color palettes.
2. **Component Reuse First**: Always reuse or create shared components in `src/components/common/` and `src/components/layout/` before writing custom markup. See [COMPONENT_GUIDE.md](file:///d:/Projects/impress-demo-app/.agents/COMPONENT_GUIDE.md).
3. **Strict RBAC Enforcement**: Implement permissions via `<PermissionGate />` and custom hooks as documented in [RBAC_SPEC.md](file:///d:/Projects/impress-demo-app/.agents/RBAC_SPEC.md).
4. **TypeScript Strictness**: Define explicit interfaces and union types in `src/types/`. Avoid `any`.
5. **Build Verification**: Always verify that `npm run build` passes with zero type or build errors.
