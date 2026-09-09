# Reusable Component Guide & Conventions

This document outlines component patterns, folder organization, and design rules to ensure **impress-demo-app** maintains modularity and eliminates code duplication.

---

## 1. Directory Organization

All UI components are organized under `src/components/`:

```text
src/components/
├── common/             # Atomic, general-purpose UI primitives
│   ├── Button/         # Primary, secondary, outline, destructive, ghost variants
│   ├── Input/          # Text, search, select, toggle inputs
│   ├── Modal/          # Dialog wrappers, confirmation dialogs
│   ├── Badge/          # Semantic status and tag pills (emerald, amber, rose, slate)
│   ├── Table/          # Data tables with sorting, pagination, and empty states
│   ├── Card/           # Content containers and stat metric cards
│   ├── Dropdown/       # Context menus and action dropdowns
│   └── Tooltip/        # Information and status tooltips
├── layout/             # Application structural layout
│   ├── Sidebar/        # Collapsible enterprise navigation sidebar
│   ├── Navbar/         # Top header with user profile & role switcher
│   ├── PageHeader/     # Standardized page title, description, and action button bar
│   └── Container/      # Max-width layout wrappers
└── rbac/               # RBAC-specific access control wrappers
    ├── PermissionGate/ # Conditionally renders children if user holds permission
    ├── RoleBadge/      # Formatted visual pill for role types
    └── AccessGuard/    # Route/section access boundary with fallback view
```

---

## 2. Standard Component Conventions

### A. Variant-Driven Props (Button Example)

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "destructive" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}
```

### B. Badge Component (Semantic Colors)

```tsx
interface BadgeProps {
  variant?: "success" | "warning" | "danger" | "info" | "neutral";
  children: React.ReactNode;
  size?: "sm" | "md";
}
```

### C. Consistent Data Tables

- Always support loading skeletons, empty states, and responsive overflow wrappers (`overflow-x-auto`).
- Use standardized pagination controls (`TablePagination.tsx`).

---

## 3. Rules for AI Agents

1. **Do not inline repetitive HTML**: If a UI pattern (e.g., card with title and action button, modal dialog, search filter bar) is used across multiple views, extract or reuse it from `src/components/common/`.
2. **Strict Props Definition**: Every component must export its TypeScript prop interface.
3. **Accessibility**: All interactive elements (buttons, inputs, dropdowns) must have proper `aria-` attributes, focus rings, and keyboard navigability.
