# Role-Based Access Control (RBAC) Specification

This document defines the RBAC data models, permission keys, and access evaluation rules for **impress-demo-app**.

---

## 1. Role Hierarchy & Descriptions

| Role                   | Key                  | Access Level        | Description                                                                        |
| :--------------------- | :------------------- | :------------------ | :--------------------------------------------------------------------------------- |
| **Super Admin**        | `super_admin`        | Full System Access  | Complete control over orgs, roles, permissions, users, and audit logs.             |
| **Organization Admin** | `org_admin`          | Organization Scope  | Manages users, assigns existing roles, views audit logs within the org.            |
| **Compliance Officer** | `compliance_officer` | Security & Auditing | Read-only access to policies, full access to audit trails and export capabilities. |
| **Department Manager** | `dept_manager`       | Team Scope          | Invites and manages users within their department; read-only access to roles.      |
| **Viewer / Analyst**   | `viewer`             | Read-Only           | Read-only dashboard metrics and view-only permissions.                             |

---

## 2. Granular Permissions Model

Permissions follow the format: `<resource>:<action>`

### Resource Permissions

| Category                | Permission Key    | Description                                 |
| :---------------------- | :---------------- | :------------------------------------------ |
| **Users**               | `users:read`      | View user list and profile details          |
|                         | `users:create`    | Invite or create new users                  |
|                         | `users:update`    | Edit user profile and departmental metadata |
|                         | `users:delete`    | Deactivate or delete user accounts          |
| **Roles & Permissions** | `roles:read`      | View roles and attached permission matrix   |
|                         | `roles:create`    | Create custom enterprise roles              |
|                         | `roles:update`    | Modify existing role permissions            |
|                         | `roles:delete`    | Delete custom roles                         |
|                         | `roles:assign`    | Assign/unassign roles to users              |
| **Audit Logs**          | `audit:read`      | View security and activity audit logs       |
|                         | `audit:export`    | Export audit logs as CSV/JSON               |
| **Settings**            | `settings:read`   | View company/security settings              |
|                         | `settings:update` | Update SSO, MFA, and organization policies  |

---

## 3. UI Implementation Patterns

### Conditional UI Rendering with `<PermissionGate />`

```tsx
// Example usage for protected action buttons
<PermissionGate permission="users:create">
  <Button variant="primary" onClick={openInviteModal}>
    Invite User
  </Button>
</PermissionGate>
```

### Route-Level Guards

```tsx
// Example protecting entire views
<AccessGuard
  requiredRole={["super_admin", "org_admin"]}
  fallback={<AccessDeniedView />}
>
  <RoleManagementPage />
</AccessGuard>
```

### Interactive Role Switcher (Demo Feature)

Provide a quick switcher in the top navigation bar or settings drawer to quickly change the simulated active role (`super_admin`, `org_admin`, `dept_manager`, `viewer`) so stakeholders can immediately experience different RBAC states during demos.
