# @thepadhiar/ui-components

A hand-built React 19 + TypeScript component library for **enterprise dashboards** — buttons, form inputs, modals, avatars, and a full-featured data table. Styled with Tailwind CSS v4, typed end-to-end, and shipped with optional Formik bindings so your forms stay boilerplate-free.

No Radix, no Headless UI, no runtime CSS-in-JS. Every component is plain React with Tailwind utility classes, so it inherits your theme and stays easy to override.

---

## Table of Contents

- [Highlights](#highlights)
- [Requirements](#requirements)
- [Installation](#installation)
- [Tailwind CSS Setup](#tailwind-css-setup)
- [Quick Start](#quick-start)
- [Components](#components)
  - [Buttons](#buttons)
  - [Inputs](#inputs)
  - [Modals](#modals)
  - [Media](#media)
  - [DataTable](#datatable)
  - [Formik Bindings](#formik-bindings)
- [Styling & Overrides](#styling--overrides)
- [TypeScript](#typescript)
- [Full API Reference](#full-api-reference)

---

## Highlights

- **27 components** across buttons, inputs, modals, media, and tables
- **Fully typed** — every prop, option, and callback has an exported interface
- **Formik-ready** — 9 drop-in wrappers that bind to a field by `name` and surface validation errors automatically
- **Powerful DataTable** — three visual variants, global search, per-column filters, sorting, and pagination, in either client-side or server-side mode
- **Controlled-first** — components take `value` + `onChange`, so they compose with any state manager
- **Accessible defaults** — labels, `aria-*` attributes, keyboard dismissal, and focus rings out of the box
- **Tree-shakeable ESM** — import only what you use

---

## Requirements

| Package | Version | Required? |
| --- | --- | --- |
| `react` | `>=18` (built and tested against 19) | Yes |
| `react-dom` | `>=18` | Yes |
| `tailwindcss` | `^4` | Yes — components are styled with Tailwind utilities |
| `lucide-react` | `>=1` | Yes — used for all icons |
| `formik` | `^2` | Only if you use the `Formik*` components |

---

## Installation

```bash
npm install @thepadhiar/ui-components
```

```bash
pnpm add @thepadhiar/ui-components
```

```bash
yarn add @thepadhiar/ui-components
```

Then install the peer dependencies you don't already have:

```bash
npm install react react-dom lucide-react tailwindcss @tailwindcss/vite
```

```bash
# only needed for the Formik wrappers
npm install formik
```

---

## Tailwind CSS Setup

This library ships **class names, not a stylesheet**. Tailwind needs to see the package's files so it generates the utilities the components use. Without this step the components render unstyled.

**1. Add the Tailwind plugin** (Vite example — see the [Tailwind docs](https://tailwindcss.com/docs/installation) for Next.js, Astro, and others):

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

**2. Import Tailwind and register this package as a source** in your global CSS:

```css
/* src/index.css */
@import "tailwindcss";

/* Path is relative to THIS css file — adjust the ../ depth for your project */
@source "../node_modules/@thepadhiar/ui-components/dist";
```

**3. Add the shimmer keyframes** if you plan to use `<Button variant="shimmer" />`:

```css
@keyframes shimmer-slide {
  0%   { transform: translateX(-150%) skewX(-20deg); }
  100% { transform: translateX(250%) skewX(-20deg); }
}

.animate-shimmer {
  animation: shimmer-slide 3.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}
```

---

## Quick Start

```tsx
import { useState } from 'react'
import { Button, TextInput, Select, type SelectOption } from '@thepadhiar/ui-components'
import { Mail, Save } from 'lucide-react'

const ROLES: SelectOption[] = [
  { value: 'admin', label: 'Org Admin', description: 'Full access' },
  { value: 'viewer', label: 'Viewer' },
]

export function InviteForm() {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('')

  return (
    <form className="space-y-4 max-w-sm">
      <TextInput
        label="Work Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        leftIcon={<Mail className="w-4 h-4" />}
        helperText="We'll send the invite here."
        required
        clearable
        onClear={() => setEmail('')}
      />

      <Select label="Role" options={ROLES} value={role} onChange={setRole} searchable required />

      <Button type="submit" variant="primary" leftIcon={<Save className="w-4 h-4" />} fullWidth>
        Send Invite
      </Button>
    </form>
  )
}
```

Every export comes from the package root:

```tsx
import { Button, Modal, DataTable, FormikTextInput } from '@thepadhiar/ui-components'
```

---

## Components

### Buttons

| Component | Description |
| --- | --- |
| `Button` | 11 variants, 6 sizes, loading state, icon slots, `fullWidth` |
| `IconButton` | Icon-only button with `circle` / `square` / `rounded` shapes and a tooltip |

```tsx
import { Button, IconButton } from '@thepadhiar/ui-components'
import { Trash2 } from 'lucide-react'

<Button variant="primary" size="md">Save Changes</Button>
<Button variant="destructive" isLoading loadingText="Deleting…">Delete</Button>
<Button variant="outline" fullWidth>Cancel</Button>

<IconButton icon={<Trash2 className="w-4 h-4" />} variant="danger" tooltip="Delete item" />
```

**`Button` variants:** `default` · `primary` · `destructive` · `danger` · `outline` · `secondary` · `ghost` · `link` · `info` · `glass` · `shimmer`
**Sizes:** `xs` · `sm` · `default` · `md` · `lg` · `icon`

Both components extend the native `<button>` attributes and forward refs.

---

### Inputs

Every input shares the same prop vocabulary: `label`, `helperText`, `error`, `required`, `disabled`, plus per-part class overrides (`containerClassName`, `labelClassName`, …). Passing `error` swaps the field into its error style and renders the message below it.

| Component | Value type | Notes |
| --- | --- | --- |
| `TextInput` | `string` | Icon slots, `clearable`, automatic show/hide toggle for `type="password"` |
| `TextArea` | `string` | Optional `showCount` character counter against `maxLength` |
| `Select` | `string` | Searchable, clearable dropdown with descriptions, icons, and badges per option |
| `MultiSelect` | `string[]` | Tag display with `maxVisibleTags` overflow, search, select-all |
| `Checkbox` | `boolean` | Supports `indeterminate` and a secondary `description` line |
| `Switch` | `boolean` | `sm` / `md` / `lg` toggle with label and description |
| `ColorPicker` | `string` (hex) | 24 preset swatches, native color input, copy-hex button |
| `DatePicker` | `string` (`YYYY-MM-DD`) | Month navigation, `minDate` / `maxDate`, quick presets |
| `TimePicker` | `string` (`HH:mm`) | Optional `use12Hours` AM/PM UI; value always stored as 24-hour |
| `FileUpload` | `File[]` | Drag-and-drop, image thumbnails, `maxSizeMB` / `maxFiles` caps |

```tsx
import { useState } from 'react'
import { MultiSelect, Switch, DatePicker, FileUpload, type MultiSelectOption } from '@thepadhiar/ui-components'

const PERMISSIONS: MultiSelectOption[] = [
  { value: 'users:read', label: 'users:read', description: 'Read the user directory' },
  { value: 'users:delete', label: 'users:delete' },
]

function Settings() {
  const [perms, setPerms] = useState<string[]>([])
  const [mfa, setMfa] = useState(true)
  const [date, setDate] = useState('')
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="space-y-5">
      <MultiSelect
        label="Permissions"
        options={PERMISSIONS}
        value={perms}
        onChange={setPerms}
        maxVisibleTags={2}
        searchable
      />

      <Switch
        label="Enforce Two-Factor Authentication"
        description="Require an OTP on every login."
        checked={mfa}
        onChange={setMfa}
      />

      <DatePicker label="Effective Date" value={date} onChange={setDate} minDate="2026-01-01" required />

      <FileUpload
        label="Attachments"
        value={files}
        onChange={setFiles}
        accept="image/*,.pdf"
        maxSizeMB={5}
        maxFiles={4}
        multiple
      />
    </div>
  )
}
```

---

### Modals

| Component | Use it for |
| --- | --- |
| `Modal` | The primitive — custom content, `sm`–`full` sizes, Esc / backdrop dismissal, footer slot |
| `InfoModal` | Read-only key/value detail cards |
| `DeleteModal` | Destructive confirmation, optionally gated behind a typed confirmation phrase |
| `DialogModal` | Confirm/cancel prompts with a themed `success` / `warning` / `info` / `danger` icon |

```tsx
import { useState } from 'react'
import { Modal, DeleteModal, DialogModal, Button } from '@thepadhiar/ui-components'

function Example() {
  const [open, setOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  return (
    <>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Custom Dialog"
        description="Optional subtitle text"
        size="lg"
        footer={<Button variant="primary" onClick={() => setOpen(false)}>Done</Button>}
      >
        <p>Any content goes here.</p>
      </Modal>

      <DeleteModal
        isOpen={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={handleDelete}
        itemName="Production Access Policy v2.4"
        requiredConfirmationText="DELETE"
      />
    </>
  )
}
```

`DialogModal` covers the generic confirm case:

```tsx
<DialogModal
  isOpen={open}
  onClose={() => setOpen(false)}
  onConfirm={publish}
  title="Publish Policy Update?"
  description="This rolls out instantly to all connected identities."
  iconType="warning"
  confirmText="Publish Changes"
  confirmVariant="primary"
  isLoading={publishing}
/>
```

---

### Media

```tsx
import { ProfileAvatar } from '@thepadhiar/ui-components'

<ProfileAvatar
  src={user.avatarUrl}
  name="Elena Rostova"   // falls back to initials, then a generic icon
  shape="circle"         // circle | square | rounded | squircle
  size="lg"              // xs | sm | md | lg | xl | 2xl
  status="online"        // online | offline | busy | away
  showStatus
  isEditable
  onEditClick={openUploadDialog}
/>
```

---

### DataTable

A generic table with global search, per-column filtering, click-to-sort headers, and pagination. It works **client-side by default** — hand it an array and it does the rest.

```tsx
import { DataTable, IconButton, type ColumnDef } from '@thepadhiar/ui-components'
import { Trash2 } from 'lucide-react'

interface Employee {
  id: number
  name: string
  role: string
  status: 'Active' | 'Invited' | 'Suspended'
}

const columns: ColumnDef<Employee>[] = [
  { key: 'name', header: 'Name', sortable: true },
  {
    key: 'role',
    header: 'Role',
    sortable: true,
    filterable: true,
    filterType: 'select',
    filterOptions: [
      { value: 'Org Admin', label: 'Org Admin' },
      { value: 'Viewer', label: 'Viewer' },
    ],
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    render: (row) => <StatusBadge status={row.status} />,
  },
]

<DataTable
  variant="bordered"
  data={employees}
  columns={columns}
  getRowId={(row) => row.id}
  rowActions={(row) => (
    <IconButton icon={<Trash2 className="w-3.5 h-3.5" />} onClick={() => remove(row.id)} />
  )}
/>
```

**Variants**

| `variant` | Look |
| --- | --- |
| `bordered` *(default)* | Dense enterprise table — full borders, uppercase header bar, zebra striping |
| `minimal` | Same markup, hairline row dividers only, more whitespace |
| `cards` | No `<table>` — each row becomes a card in a responsive grid, with a "Sort by" chip row |

**Server-side mode.** Every stateful concern (`search`, `sort`, `filters`, `page`, `pageSize`) follows the same controlled/uncontrolled pattern. Pass `serverSide` + `totalCount` and the table stops processing locally — it just calls your change handlers so you can refetch:

```tsx
<DataTable
  serverSide
  totalCount={total}
  isLoading={loading}
  data={rows}                                 // already the current page
  columns={columns}
  getRowId={(row) => row.id}
  search={search}     onSearchChange={setSearch}
  sort={sort}         onSortChange={setSort}
  filters={filters}   onFiltersChange={setFilters}
  page={page}         onPageChange={setPage}
  pageSize={pageSize} onPageSizeChange={setPageSize}
/>
```

**Processing helpers.** The pure functions the table uses internally are exported, so you can reuse the exact same semantics in your API layer or a custom table:

```tsx
import { searchRows, filterRows, sortRows, paginateRows } from '@thepadhiar/ui-components'

let rows = searchRows(allEmployees, columns, search)
rows = filterRows(rows, columns, filters)
rows = sortRows(rows, columns, sort)
const total = rows.length
const pageRows = paginateRows(rows, page, pageSize)
```

---

### Formik Bindings

Nine wrappers bind the matching input to a Formik field by `name`, and derive `error` from `meta.touched && meta.error` automatically. Everything else — `label`, `options`, `accept`, and so on — is identical to the wrapped component.

| Wrapper | Wraps | Managed by Formik |
| --- | --- | --- |
| `FormikTextInput` | `TextInput` | `value`, `onChange`, `onBlur` |
| `FormikTextArea` | `TextArea` | `value`, `onChange`, `onBlur` |
| `FormikSelect` | `Select` | `value`, `onChange` |
| `FormikMultiSelect` | `MultiSelect` | `value`, `onChange` |
| `FormikCheckbox` | `Checkbox` | `checked`, `onChange` |
| `FormikSwitch` | `Switch` | `checked`, `onChange` |
| `FormikDatePicker` | `DatePicker` | `value`, `onChange` |
| `FormikColorPicker` | `ColorPicker` | `value`, `onChange` |
| `FormikFileUpload` | `FileUpload` | `value`, `onChange` |

```tsx
import { Formik, Form } from 'formik'
import {
  FormikTextInput,
  FormikSelect,
  FormikSwitch,
  FormikCheckbox,
  Button,
} from '@thepadhiar/ui-components'

<Formik
  initialValues={{ fullName: '', role: '', twoFactor: true, agreeTerms: false }}
  validate={(values) => {
    const errors: Record<string, string> = {}
    if (!values.fullName) errors.fullName = 'Required'
    if (!values.agreeTerms) errors.agreeTerms = 'You must accept the terms'
    return errors
  }}
  onSubmit={(values) => console.log(values)}
>
  <Form className="space-y-5">
    <FormikTextInput name="fullName" label="Full Name" required />
    <FormikSelect name="role" label="Role" options={ROLES} required />
    <FormikSwitch name="twoFactor" label="Enforce MFA" />
    <FormikCheckbox name="agreeTerms" label="I agree to the terms" required />
    <Button type="submit" variant="primary">Submit</Button>
  </Form>
</Formik>
```

---

## Styling & Overrides

Components never lock you out of their markup:

- **Per-part class props** — inputs accept `containerClassName`, `labelClassName`, `inputClassName` / `textareaClassName` / `buttonClassName` / `menuClassName` / `dropzoneClassName`, and `errorClassName`.
- **`className`** on `Button`, `IconButton`, `Modal`, `ProfileAvatar`, and `DataTable` is appended to the root element, so your utilities win against the defaults.
- **Native props pass through** — `Button`, `IconButton`, `TextInput`, `TextArea`, and `Checkbox` extend their underlying HTML element's attributes and forward refs.

```tsx
<TextInput
  label="Search"
  containerClassName="mb-0"
  inputClassName="rounded-full bg-slate-50"
/>
```

---

## TypeScript

Types ship with the package — no `@types/` install needed. Notable exports:

```ts
import type {
  ButtonProps, ButtonVariant, ButtonSize,
  IconButtonProps,
  TextInputProps, TextAreaProps, CheckboxProps, SwitchProps,
  SelectProps, SelectOption,
  MultiSelectProps, MultiSelectOption,
  DatePickerProps, TimePickerProps, ColorPickerProps,
  FileUploadProps, UploadedFileItem,
  ModalProps, InfoModalProps, InfoModalItem, DeleteModalProps, DialogModalProps,
  ProfileAvatarProps, AvatarShape, AvatarSize, AvatarStatus,
  DataTableProps, ColumnDef, ColumnFilterOption,
  SortState, SortDirection, FilterState, TableVariant,
} from '@thepadhiar/ui-components'
```

`DataTable`, `ColumnDef`, and `DataTableProps` are generic over your row type, so `render`, `accessor`, `getRowId`, and `rowActions` are all fully inferred.

---

## Full API Reference

Every prop of every component, with defaults and descriptions, is documented in [COMPONENTS.md](./COMPONENTS.md).
