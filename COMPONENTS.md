# Component Reference

Complete usage guide for every component in this library. There are two families, both zero-dependency and hand-built:

1. **Core** (`src/components/{buttons,inputs,modals,media}`) — the base components. Import from `./components`.
2. **Formik** (`src/components/formik`) — thin wrappers around the Core inputs that bind to a `Formik` field by `name`. Import from `./components`.

All examples assume:

```tsx
import { /* core + formik */ } from './components'
```

---

## Table of Contents

**Core — Buttons**: [Button](#button) · [IconButton](#iconbutton)
**Core — Inputs**: [TextInput](#textinput) · [TextArea](#textarea) · [Select](#select) · [MultiSelect](#multiselect) · [Checkbox](#checkbox) · [Switch](#switch) · [ColorPicker](#colorpicker) · [DatePicker](#datepicker) · [TimePicker](#timepicker) · [FileUpload](#fileupload)
**Core — Modals**: [Modal](#modal) · [InfoModal](#infomodal) · [DeleteModal](#deletemodal) · [DialogModal](#dialogmodal)
**Core — Media**: [ProfileAvatar](#profileavatar)
**Core — Table**: [DataTable](#datatable) · [Process helpers](#process-helpers-sortrows--filterrows--searchrows--paginaterows)
**Formik Wrappers**: [FormikTextInput](#formiktextinput-and-siblings) (and 8 siblings)

---

## Core — Buttons

### Button

`src/components/buttons/Button.tsx`

```tsx
import { Button } from './components'
import { Sparkles } from 'lucide-react'

<Button variant="primary" leftIcon={<Sparkles className="w-4 h-4" />} onClick={() => {}}>
  Save Changes
</Button>

<Button variant="destructive" isLoading loadingText="Deleting...">
  Delete
</Button>
```

Extends all native `<button>` attributes.

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `'default' \| 'primary' \| 'destructive' \| 'danger' \| 'outline' \| 'secondary' \| 'ghost' \| 'link' \| 'info' \| 'glass' \| 'shimmer'` | `'default'` | Visual style |
| `size` | `'default' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'icon'` | `'default'` | Height/padding scale |
| `isLoading` | `boolean` | `false` | Shows a spinner, disables the button |
| `loadingText` | `string` | — | Text shown instead of `children` while loading |
| `leftIcon` / `rightIcon` | `React.ReactNode` | — | Icon slots either side of the label |
| `fullWidth` | `boolean` | `false` | Stretches to `w-full` |
| `disabled` | `boolean` | `false` | Native disabled state |

### IconButton

`src/components/buttons/IconButton.tsx`

```tsx
import { IconButton } from './components'
import { Trash2 } from 'lucide-react'

<IconButton
  icon={<Trash2 className="w-4 h-4" />}
  variant="danger"
  shape="rounded"
  tooltip="Delete item"
  onClick={() => {}}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `React.ReactNode` | **required** | Icon to render |
| `variant` | `ButtonVariant` (same as `Button`) | `'secondary'` | Visual style |
| `size` | `ButtonSize` (same as `Button`) | `'default'` | Button box size |
| `shape` | `'circle' \| 'square' \| 'rounded'` | `'rounded'` | Corner radius |
| `isLoading` | `boolean` | `false` | Shows spinner in place of icon |
| `tooltip` | `string` | — | Hover tooltip text |
| `ariaLabel` | `string` | tooltip or `'Action button'` | Accessible label override |

---

## Core — Inputs

### TextInput

`src/components/inputs/TextInput.tsx`

```tsx
import { TextInput } from './components'
import { Mail } from 'lucide-react'

<TextInput
  label="Corporate Email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  leftIcon={<Mail className="w-4 h-4" />}
  required
  clearable
  onClear={() => setEmail('')}
  error={emailError}
  helperText="We'll never share this."
/>
```

Extends all native `<input>` attributes. `type="password"` automatically gets a show/hide eye toggle.

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Field label |
| `helperText` | `string` | — | Hint shown when there's no error |
| `error` | `string` | — | Error text; also switches the input to an error style |
| `required` | `boolean` | — | Adds a red asterisk to the label |
| `leftIcon` / `rightIcon` | `React.ReactNode` | — | Icon slots (rightIcon hidden if `clearable` or password) |
| `clearable` | `boolean` | — | Shows a clear (✕) button when there's a value |
| `onClear` | `() => void` | — | Called when the clear button is clicked |
| `containerClassName` / `labelClassName` / `inputClassName` / `errorClassName` | `string` | `''` | Style overrides for each part |

### TextArea

`src/components/inputs/TextArea.tsx`

```tsx
import { TextArea } from './components'

<TextArea
  label="Notes"
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  showCount
  maxLength={200}
  helperText="Optional context for reviewers."
/>
```

Extends all native `<textarea>` attributes.

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Field label |
| `helperText` / `error` / `required` | see TextInput | — | Same behavior as `TextInput` |
| `showCount` | `boolean` | — | Displays `current/maxLength` counter (turns amber near the limit) |
| `maxLength` | `number` | — | Character limit, enforced natively and shown in the counter |
| `containerClassName` / `labelClassName` / `textareaClassName` / `errorClassName` | `string` | `''` | Style overrides |

### Select

`src/components/inputs/Select.tsx`

```tsx
import { Select, type SelectOption } from './components'
import { Shield } from 'lucide-react'

const ROLE_OPTIONS: SelectOption[] = [
  { value: 'admin', label: 'Admin', description: 'Full access', icon: <Shield className="w-4 h-4" /> },
  { value: 'viewer', label: 'Viewer', disabled: false },
]

<Select
  label="Role"
  options={ROLE_OPTIONS}
  value={role}
  onChange={setRole}
  searchable
  clearable
  required
/>
```

`SelectOption`: `{ value: string; label: string; description?: string; icon?: React.ReactNode; badge?: string; disabled?: boolean }`

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `SelectOption[]` | **required** | Choices to render |
| `value` | `string` | — | Currently selected value |
| `onChange` | `(value: string) => void` | **required** | Fired on selection (empty string on clear) |
| `label` / `placeholder` | `string` | — / `'Select an option'` | |
| `helperText` / `error` / `required` / `disabled` | — | — | Same semantics as `TextInput` |
| `searchable` | `boolean` | `false` | Adds a filter input inside the dropdown |
| `clearable` | `boolean` | `false` | Adds an inline ✕ to reset the value |
| `containerClassName` / `labelClassName` / `buttonClassName` / `menuClassName` / `errorClassName` | `string` | `''` | Style overrides |

### MultiSelect

`src/components/inputs/MultiSelect.tsx`

```tsx
import { MultiSelect, type MultiSelectOption } from './components'

const PERMISSIONS: MultiSelectOption[] = [
  { value: 'users:read', label: 'users:read', description: 'Read user directory' },
  { value: 'users:delete', label: 'users:delete' },
]

<MultiSelect
  label="Permissions"
  options={PERMISSIONS}
  value={permissions}
  onChange={setPermissions}
  searchable
  maxVisibleTags={2}
/>
```

`MultiSelectOption`: `{ value: string; label: string; description?: string; icon?: React.ReactNode; badgeColor?: string; disabled?: boolean }`

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `MultiSelectOption[]` | **required** | Choices to render |
| `value` | `string[]` | **required** | Currently selected values |
| `onChange` | `(value: string[]) => void` | **required** | Fired whenever the selection set changes |
| `label` / `placeholder` | `string` | — / `'Select multiple...'` | |
| `searchable` | `boolean` | `true` | Filter input inside the dropdown |
| `maxVisibleTags` | `number` | `3` | Tags shown before collapsing into `+N more` |
| `helperText` / `error` / `required` / `disabled` | — | — | Same semantics as `TextInput` |
| `containerClassName` / `labelClassName` / `buttonClassName` / `menuClassName` / `errorClassName` | `string` | `''` | Style overrides |

Includes a built-in "Select All / Deselect All" row and per-tag remove buttons.

### Checkbox

`src/components/inputs/Checkbox.tsx`

```tsx
import { Checkbox } from './components'

<Checkbox
  label="I agree to the terms"
  description="Required to continue."
  checked={agreed}
  onChange={setAgreed}
  required
/>

<Checkbox label="Partial selection" checked={false} indeterminate onChange={() => {}} />
```

Extends native `<input>` attributes except `type` and `onChange` (which are overridden).

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | **required** | Checked state |
| `onChange` | `(checked: boolean) => void` | **required** | Fired on toggle |
| `indeterminate` | `boolean` | `false` | Renders a dash instead of a check |
| `label` | `React.ReactNode` | — | Main label |
| `description` | `string` | — | Secondary line under the label |
| `helperText` / `error` / `required` / `disabled` | — | — | Same semantics as `TextInput` |
| `containerClassName` / `labelClassName` / `checkboxClassName` / `errorClassName` | `string` | `''` | Style overrides |

### Switch

`src/components/inputs/Switch.tsx`

```tsx
import { Switch } from './components'

<Switch
  label="Enable Two-Factor Authentication"
  description="Require an OTP on every login."
  checked={twoFactor}
  onChange={setTwoFactor}
  size="md"
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | **required** | On/off state |
| `onChange` | `(checked: boolean) => void` | **required** | Fired on toggle |
| `label` / `description` | `string` | — | Label text and secondary line |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Track/thumb size |
| `helperText` / `error` / `required` / `disabled` | — | — | Same semantics as `TextInput` |
| `containerClassName` / `labelClassName` / `switchClassName` / `errorClassName` | `string` | `''` | Style overrides |

### ColorPicker

`src/components/inputs/ColorPicker.tsx`

```tsx
import { ColorPicker } from './components'

<ColorPicker label="Brand Accent Color" value={color} onChange={setColor} required />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` (hex, e.g. `#3B82F6`) | `'#3B82F6'` | Current color |
| `onChange` | `(color: string) => void` | **required** | Fired on swatch pick or native picker change |
| `swatches` | `string[]` | 24 built-in presets | Palette shown in the popover |
| `label` / `helperText` / `error` / `required` / `disabled` | — | — | Same semantics as `TextInput` |
| `containerClassName` / `labelClassName` / `inputClassName` / `errorClassName` | `string` | `''` | Style overrides |

Includes a native `<input type="color">` picker and a copy-hex button.

### DatePicker

`src/components/inputs/DatePicker.tsx`

```tsx
import { DatePicker } from './components'

<DatePicker
  label="Expiration Date"
  value={date}          // 'YYYY-MM-DD'
  onChange={setDate}
  minDate="2026-01-01"
  maxDate="2026-12-31"
  required
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` (`YYYY-MM-DD`) | `''` | Current date |
| `onChange` | `(date: string) => void` | **required** | Fired on day select, preset click, or clear (`''`) |
| `minDate` / `maxDate` | `string` (`YYYY-MM-DD`) | — | Disables days outside this range |
| `placeholder` | `string` | `'YYYY-MM-DD'` | Shown when empty |
| `label` / `helperText` / `error` / `required` / `disabled` | — | — | Same semantics as `TextInput` |
| `containerClassName` / `labelClassName` / `inputClassName` / `errorClassName` | `string` | `''` | Style overrides |

Popover includes month navigation and "Today / Tomorrow / +1 Week" quick presets.

### TimePicker

`src/components/inputs/TimePicker.tsx`

```tsx
import { TimePicker } from './components'

<TimePicker label="Shift Time" value={time} onChange={setTime} use12Hours required />
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` (`HH:mm`, 24h) | `''` | Current time, always emitted/read as 24h |
| `onChange` | `(time: string) => void` | **required** | Fired on hour/minute/period pick or clear |
| `use12Hours` | `boolean` | `true` | Show AM/PM picker UI (value is still stored as 24h) |
| `placeholder` | `string` | `'Select time...'` | Shown when empty |
| `label` / `helperText` / `error` / `required` / `disabled` | — | — | Same semantics as `TextInput` |
| `containerClassName` / `labelClassName` / `inputClassName` / `errorClassName` | `string` | `''` | Style overrides |

### FileUpload

`src/components/inputs/FileUpload.tsx`

```tsx
import { FileUpload } from './components'

<FileUpload
  label="Attachments"
  value={files}
  onChange={setFiles}
  multiple
  accept="image/*,.pdf,.doc,.docx"
  maxSizeMB={5}
  maxFiles={4}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `File[]` | `[]` | Currently selected files |
| `onChange` | `(files: File[]) => void` | **required** | Fired after add/remove (oversized files are silently dropped) |
| `multiple` | `boolean` | `true` | Allow more than one file |
| `accept` | `string` | — | Native `accept` filter, e.g. `'image/*,.pdf'` |
| `maxSizeMB` | `number` | `10` | Per-file size cap |
| `maxFiles` | `number` | `5` | Cap on total files when `multiple` |
| `label` / `helperText` / `error` / `required` / `disabled` | — | — | Same semantics as `TextInput` |
| `containerClassName` / `labelClassName` / `dropzoneClassName` / `errorClassName` | `string` | `''` | Style overrides |

Drag-and-drop zone with live thumbnail previews for images and a generic file icon otherwise.

---

## Core — Modals

### Modal

`src/components/modals/Modal.tsx` — the low-level primitive that `InfoModal`, `DeleteModal`, and `DialogModal` are built on. Use it directly for fully custom dialogs.

```tsx
import { Modal, Button } from './components'

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Custom Dialog"
  description="Optional subtitle text"
  size="lg"
  footer={<Button variant="primary" onClick={() => setIsOpen(false)}>Done</Button>}
>
  <p>Any content goes here.</p>
</Modal>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` | `boolean` | **required** | Controls mount/visibility |
| `onClose` | `() => void` | **required** | Called on backdrop click, Esc, or close button |
| `title` | `React.ReactNode` | — | String renders as a heading; a node renders as-is |
| `description` | `string` | — | Subtitle under the title |
| `children` | `React.ReactNode` | **required** | Body content |
| `footer` | `React.ReactNode` | — | Right-aligned footer actions |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Max width of the dialog |
| `showCloseButton` | `boolean` | `true` | Show the ✕ in the header |
| `closeOnOutsideClick` | `boolean` | `true` | Click on backdrop closes the modal |
| `closeOnEsc` | `boolean` | `true` | Escape key closes the modal |
| `className` | `string` | `''` | Extra classes on the dialog panel |

### InfoModal

`src/components/modals/InfoModal.tsx` — read-only key/value inspector card.

```tsx
import { InfoModal } from './components'

<InfoModal
  isOpen={isInfoOpen}
  onClose={() => setIsInfoOpen(false)}
  title="Identity Record Details"
  subtitle="User configuration snapshot"
  badge={<span className="text-xs">ID: usr-9041</span>}
  items={[
    { label: 'Full Name', value: 'Jane Doe' },
    { label: 'Role', value: 'Org Admin' },
  ]}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` / `onClose` | see `Modal` | **required** | |
| `title` | `string` | **required** | Header title |
| `subtitle` | `string` | — | Header description |
| `items` | `{ label: string; value: React.ReactNode }[]` | — | Rows rendered in a bordered key/value list |
| `children` | `React.ReactNode` | — | Extra content below `items` |
| `badge` | `React.ReactNode` | — | Small element next to the title (e.g. an ID chip) |
| `closeButtonText` | `string` | `'Done'` | Footer button label |

### DeleteModal

`src/components/modals/DeleteModal.tsx` — destructive-action confirmation, optionally requiring the user to type a confirmation phrase.

```tsx
import { DeleteModal } from './components'

<DeleteModal
  isOpen={isDeleteOpen}
  onClose={() => setIsDeleteOpen(false)}
  onConfirm={() => handleDelete()}
  itemName="Production Access Policy v2.4"
  requiredConfirmationText="DELETE"
  isDeleting={isDeleting}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` / `onClose` | see `Modal` | **required** | |
| `onConfirm` | `() => void` | **required** | Called only once the confirmation text (if any) matches |
| `title` | `string` | `'Confirm Deletion'` | |
| `itemName` | `string` | — | Shown in a highlighted "Target:" row |
| `message` | `string` | generic warning copy | Body text |
| `isDeleting` | `boolean` | `false` | Disables buttons and shows a spinner on Confirm |
| `requiredConfirmationText` | `string` | — | If set, Confirm stays disabled until the user types this exact text |

### DialogModal

`src/components/modals/DialogModal.tsx` — generic confirm/cancel dialog with a themed icon.

```tsx
import { DialogModal } from './components'

<DialogModal
  isOpen={isDialogOpen}
  onClose={() => setIsDialogOpen(false)}
  onConfirm={() => publish()}
  title="Publish Policy Update?"
  description="This rolls out instantly to all connected identities."
  iconType="warning"
  confirmText="Publish Changes"
  confirmVariant="primary"
>
  <p>Ensure staging has been reviewed first.</p>
</DialogModal>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `isOpen` / `onClose` | see `Modal` | **required** | |
| `onConfirm` | `() => void` | **required** | Called when Confirm is clicked |
| `title` | `string` | **required** | Header title |
| `description` | `string` | — | Header subtitle |
| `icon` | `React.ReactNode` | — | Overrides the icon derived from `iconType` |
| `iconType` | `'success' \| 'warning' \| 'info' \| 'danger' \| 'custom'` | `'custom'` | Picks icon + accent color theme |
| `children` | `React.ReactNode` | — | Body content |
| `confirmText` / `cancelText` | `string` | `'Confirm'` / `'Cancel'` | Button labels |
| `confirmVariant` | `ButtonVariant` | `'primary'` | Style of the confirm button |
| `isLoading` | `boolean` | `false` | Shows a spinner on Confirm and disables both buttons |

---

## Core — Media

### ProfileAvatar

`src/components/media/ProfileAvatar.tsx`

```tsx
import { ProfileAvatar } from './components'

<ProfileAvatar
  name="Elena Rostova"
  shape="circle"
  size="lg"
  status="online"
  showStatus
  isEditable
  onEditClick={() => openUploadDialog()}
/>
```

| Prop | Type | Default | Description |
|---|---|---|---|
| `src` | `string` | — | Image URL; falls back to initials, then a generic user icon, on load error |
| `alt` | `string` | `'Avatar'` | Image alt text |
| `name` | `string` | — | Used to derive initials (first letters of first two words) |
| `shape` | `'circle' \| 'square' \| 'rounded' \| 'squircle'` | `'circle'` | Corner style |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'` | `'md'` | Overall dimensions |
| `status` | `'online' \| 'offline' \| 'busy' \| 'away'` | `'online'` | Color of the status dot |
| `showStatus` | `boolean` | `false` | Render the status dot |
| `isEditable` | `boolean` | `false` | Show a camera-icon hover overlay |
| `onEditClick` | `() => void` | — | Called when the hover overlay is clicked |
| `className` | `string` | `''` | Extra classes on the outer wrapper |

---

## Core — Table

### DataTable

`src/components/table/DataTable.tsx` — a generic, headless-logic data table with three selectable visual variants, built-in global search, per-column filtering, click-to-sort headers, and pagination. Works fully standalone (client-side processing over the `data` you pass in) or in **server-side mode**, where you own the fetching and the table just renders whatever page you give it.

```tsx
import { DataTable, type ColumnDef } from './components'

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
  { key: 'status', header: 'Status', sortable: true, render: (row) => <StatusBadge status={row.status} /> },
]

<DataTable
  variant="bordered"           // 'bordered' | 'minimal' | 'cards'
  data={employees}
  columns={columns}
  getRowId={(row) => row.id}
  rowActions={(row) => <IconButton icon={<Trash2 className="w-3.5 h-3.5" />} onClick={() => remove(row.id)} />}
/>
```

**Three UI variants** (`variant` prop), all sharing the same toolbar/pagination:

| Variant | Look |
|---|---|
| `'bordered'` | Classic dense enterprise table — full borders, uppercase header bar, zebra striping, row hover highlight. Default. |
| `'minimal'` | Same `<table>` markup, no boxed border or header background — just hairline row dividers and more whitespace. |
| `'cards'` | No `<table>` at all — each row renders as its own bordered card in a responsive grid, with the first column as the card title and the rest as label/value pairs. A "Sort by" chip row replaces clickable column headers. |

**Core props**

| Prop | Type | Default | Description |
|---|---|---|---|
| `data` | `T[]` | **required** | Rows to render. In server-side mode this must already be the current page. |
| `columns` | `ColumnDef<T>[]` | **required** | Column definitions (see below) |
| `getRowId` | `(row: T) => string \| number` | **required** | Stable React key per row |
| `variant` | `'bordered' \| 'minimal' \| 'cards'` | `'bordered'` | Visual style |
| `rowActions` | `(row: T) => React.ReactNode` | — | Rendered as a trailing actions cell/corner per row |
| `emptyMessage` | `string` | `'No results found.'` | Shown when there are zero rows after filtering |
| `isLoading` | `boolean` | `false` | Dims the body and shows a spinner overlay (for server-side fetches) |
| `className` | `string` | — | Extra classes on the outer wrapper |

**`ColumnDef<T>`**

| Field | Type | Description |
|---|---|---|
| `key` | `string` | Unique id; also the default accessor (`row[key]`) |
| `header` | `string` | Column header / card field label |
| `accessor` | `(row: T) => unknown` | Custom value getter, used for sort/filter/search when the value isn't a direct property |
| `render` | `(row: T, value: unknown) => ReactNode` | Custom cell renderer |
| `sortable` | `boolean` | Enables click-to-sort on this column |
| `filterable` | `boolean` | Adds a filter control to the toolbar for this column |
| `filterType` | `'text' \| 'select'` | Text substring match, or exact-match dropdown (needs `filterOptions`) |
| `filterOptions` | `{ value: string; label: string }[]` | Options for a `'select'` filter |
| `align` | `'left' \| 'center' \| 'right'` | Cell/header text alignment (table variants only) |
| `width` | `string` | CSS width for the `<th>` (table variants only) |

**Client-side vs. server-side.** Every stateful concern — `search`, `sort`, `filters`, `page`, `pageSize` — follows the same controlled/uncontrolled pattern: pass nothing and the table manages its own state; pass `value` + `onChange` (e.g. `sort` + `onSortChange`) and you own it.

- **Client-side (default):** don't pass `serverSide`. The table filters, sorts, and paginates `data` itself using the `search`/`filterRows`/`sortRows`/`paginateRows` helpers internally.
- **Server-side:** pass `serverSide` and `totalCount`. `data` is treated as already being the correct page — the table does zero local processing. Instead it calls `onSearchChange` / `onSortChange` / `onFiltersChange` / `onPageChange` / `onPageSizeChange` whenever the user interacts, so you can refetch:

```tsx
const [search, setSearch] = useState('')
const [sort, setSort] = useState<SortState | null>(null)
const [filters, setFilters] = useState<FilterState>({})
const [page, setPage] = useState(1)
const [pageSize, setPageSize] = useState(10)
const [rows, setRows] = useState<Employee[]>([])
const [total, setTotal] = useState(0)
const [loading, setLoading] = useState(false)

useEffect(() => {
  setLoading(true)
  fetch(`/api/employees?${toQueryString({ search, sort, filters, page, pageSize })}`)
    .then((r) => r.json())
    .then(({ rows, total }) => {
      setRows(rows)
      setTotal(total)
      setLoading(false)
    })
}, [search, sort, filters, page, pageSize])

<DataTable
  serverSide
  data={rows}
  totalCount={total}
  isLoading={loading}
  columns={columns}
  getRowId={(row) => row.id}
  search={search} onSearchChange={setSearch}
  sort={sort} onSortChange={setSort}
  filters={filters} onFiltersChange={setFilters}
  page={page} onPageChange={setPage}
  pageSize={pageSize} onPageSizeChange={setPageSize}
/>
```

| Server-side prop | Type | Description |
|---|---|---|
| `serverSide` | `boolean` | Turns off local search/filter/sort/pagination processing |
| `totalCount` | `number` | Total row count on the server, used to compute page count (required in server mode) |
| `search`, `onSearchChange` | `string`, `(v: string) => void` | Controlled global search |
| `sort`, `onSortChange`, `defaultSort` | `SortState \| null`, `(s) => void`, `SortState \| null` | Controlled column sort: `{ key: string; direction: 'asc' \| 'desc' }` |
| `filters`, `onFiltersChange` | `FilterState`, `(f) => void` | Controlled per-column filters: `{ [columnKey: string]: string }` |
| `page`, `onPageChange` | `number`, `(p: number) => void` | Controlled current page (1-indexed) |
| `pageSize`, `onPageSizeChange`, `pageSizeOptions` | `number`, `(n: number) => void`, `number[]` | Controlled page size, default options `[5, 10, 25, 50]` |
| `searchable`, `searchPlaceholder` | `boolean`, `string` | Toggle/label the global search box (default `true`) |

### Process helpers (`sortRows` / `filterRows` / `searchRows` / `paginateRows`)

`src/components/table/process.ts` — the same pure functions `DataTable` uses internally for client-side mode, exported so you can reuse them to build your own server endpoint or a totally custom table:

```tsx
import { searchRows, filterRows, sortRows, paginateRows } from './components'

let rows = searchRows(allEmployees, columns, search)
rows = filterRows(rows, columns, filters)
rows = sortRows(rows, columns, sort)
const total = rows.length
const page = paginateRows(rows, pageNumber, pageSize)
```

| Function | Signature | Description |
|---|---|---|
| `getColumnValue` | `(row, column) => unknown` | Resolves a column's value via `accessor` or `row[key]` |
| `sortRows` | `(rows, columns, sort: SortState \| null) => rows` | Stable sort by one column; numbers, dates, and strings (natural/locale-aware) all compare correctly |
| `filterRows` | `(rows, columns, filters: FilterState) => rows` | Applies every non-empty filter; `'select'` does exact match, `'text'` does case-insensitive substring match |
| `searchRows` | `(rows, columns, query: string) => rows` | Case-insensitive substring match against every column's resolved value |
| `paginateRows` | `(rows, page, pageSize) => rows` | Simple 1-indexed slice |

---

## Formik Wrappers

`src/components/formik/*` — each wraps the matching Core input, binds it to Formik's `useField(name)`, and auto-derives `error` from `meta.touched && meta.error`. All other props are identical to the wrapped component (see above), minus the ones Formik manages itself (`value`/`onChange`/`checked`, as noted per component).

**FormikTextInput** and siblings:

| Component | Wraps | Props omitted (managed by Formik) |
|---|---|---|
| `FormikTextInput` | `TextInput` | `value`, `onChange`, `onBlur` |
| `FormikTextArea` | `TextArea` | `value`, `onChange`, `onBlur` |
| `FormikSelect` | `Select` | `value`, `onChange` |
| `FormikMultiSelect` | `MultiSelect` | `value`, `onChange` |
| `FormikCheckbox` | `Checkbox` | `checked`, `onChange` |
| `FormikSwitch` | `Switch` | `checked`, `onChange` |
| `FormikDatePicker` | `DatePicker` | `value`, `onChange` |
| `FormikColorPicker` | `ColorPicker` | `value`, `onChange` |
| `FormikFileUpload` | `FileUpload` | `value`, `onChange` |

Every one of them requires a `name: string` prop (the Formik field path) plus whatever other props the wrapped component needs (`label`, `options`, `accept`, etc.).

```tsx
import { Formik, Form } from 'formik'
import {
  FormikTextInput,
  FormikSelect,
  FormikMultiSelect,
  FormikCheckbox,
  FormikSwitch,
  FormikDatePicker,
  FormikColorPicker,
  FormikFileUpload,
  Button,
} from './components'

<Formik
  initialValues={{
    fullName: '', email: '', role: '', permissions: [] as string[],
    agreeTerms: false, twoFactor: true, effectiveDate: '', themeColor: '#3B82F6', files: [] as File[],
  }}
  validate={(values) => {
    const errors: Record<string, string> = {}
    if (!values.fullName) errors.fullName = 'Required'
    return errors
  }}
  onSubmit={(values) => console.log(values)}
>
  <Form className="space-y-5">
    <FormikTextInput name="fullName" label="Full Name" required />
    <FormikSelect name="role" label="Role" options={ROLE_OPTIONS} required />
    <FormikMultiSelect name="permissions" label="Permissions" options={PERMISSIONS} />
    <FormikDatePicker name="effectiveDate" label="Effective Date" required />
    <FormikColorPicker name="themeColor" label="Accent Color" />
    <FormikSwitch name="twoFactor" label="Enforce MFA" />
    <FormikCheckbox name="agreeTerms" label="I agree" required />
    <FormikFileUpload name="files" label="Attachments" maxFiles={3} />
    <Button type="submit" variant="primary">Submit</Button>
  </Form>
</Formik>
```
