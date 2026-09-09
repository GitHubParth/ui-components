import { useEffect, useState } from 'react'
import { Edit, Trash2, LayoutGrid, Rows3, Rows4, Server, Cpu } from 'lucide-react'
import { Button } from '../buttons/Button'
import { IconButton } from '../buttons/IconButton'
import { DataTable } from './DataTable'
import { filterRows, paginateRows, searchRows, sortRows } from './process'
import type { ColumnDef, FilterState, SortState, TableVariant } from './types'

interface Employee {
  id: number
  name: string
  email: string
  role: string
  department: string
  status: 'Active' | 'Invited' | 'Suspended'
  joinedDate: string
  salary: number
}

const FIRST_NAMES = [
  'Elena', 'David', 'Sarah', 'Marcus', 'Priya', 'Noah', 'Amara', 'Liam', 'Yuki', 'Carlos',
  'Fatima', 'Ivan', 'Grace', 'Kenji', 'Zara', 'Tom', 'Nadia', 'Owen', 'Leila', 'Victor',
]
const LAST_NAMES = [
  'Rostova', 'Zhao', 'Connor', 'Lee', 'Patel', 'Kim', 'Okafor', 'Wright', 'Tanaka', 'Diaz',
  'Hassan', 'Petrov', 'Chen', 'Sato', 'Ahmed', 'Novak', 'Ivanova', 'Brooks', 'Haddad', 'Volkov',
]
const ROLES = ['Org Admin', 'Compliance', 'Viewer', 'Engineer', 'Billing Admin']
const DEPARTMENTS = ['Engineering', 'Compliance', 'Sales', 'Support', 'Finance']
const STATUSES: Employee['status'][] = ['Active', 'Invited', 'Suspended']

function buildEmployees(): Employee[] {
  return Array.from({ length: 42 }, (_, i) => {
    const first = FIRST_NAMES[i % FIRST_NAMES.length]
    const last = LAST_NAMES[(i * 3 + 1) % LAST_NAMES.length]
    const role = ROLES[i % ROLES.length]
    const department = DEPARTMENTS[(i * 2) % DEPARTMENTS.length]
    const status = STATUSES[i % STATUSES.length]
    const month = String((i % 12) + 1).padStart(2, '0')
    const day = String(((i * 7) % 27) + 1).padStart(2, '0')
    return {
      id: i + 1,
      name: `${first} ${last}`,
      email: `${first.toLowerCase()}.${last.toLowerCase()}@enterprise.com`,
      role,
      department,
      status,
      joinedDate: `2024-${month}-${day}`,
      salary: 68000 + ((i * 3737) % 62000),
    }
  })
}

const EMPLOYEES = buildEmployees()

const STATUS_STYLE: Record<Employee['status'], string> = {
  Active: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400',
  Invited: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  Suspended: 'bg-rose-500/10 border-rose-500/30 text-rose-400',
}

function StatusBadge({ status }: { status: Employee['status'] }) {
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${STATUS_STYLE[status]}`}>{status}</span>
  )
}

function formatCurrency(value: unknown) {
  return `$${Number(value).toLocaleString('en-US')}`
}

function formatDate(value: unknown) {
  return new Date(String(value)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

const EMPLOYEE_COLUMNS: ColumnDef<Employee>[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  {
    key: 'role',
    header: 'Role',
    sortable: true,
    filterable: true,
    filterType: 'select',
    filterOptions: ROLES.map((r) => ({ value: r, label: r })),
  },
  {
    key: 'department',
    header: 'Department',
    sortable: true,
    filterable: true,
    filterType: 'select',
    filterOptions: DEPARTMENTS.map((d) => ({ value: d, label: d })),
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    filterable: true,
    filterType: 'select',
    filterOptions: STATUSES.map((s) => ({ value: s, label: s })),
    render: (row) => <StatusBadge status={row.status} />,
  },
  {
    key: 'joinedDate',
    header: 'Joined',
    sortable: true,
    render: (_row, value) => formatDate(value),
  },
  {
    key: 'salary',
    header: 'Salary',
    sortable: true,
    align: 'right',
    render: (_row, value) => formatCurrency(value),
  },
]

function rowActions(row: Employee) {
  return (
    <div className="flex items-center justify-end gap-1.5">
      <IconButton
        icon={<Edit className="w-3.5 h-3.5" />}
        size="xs"
        variant="ghost"
        tooltip="Edit"
        onClick={() => alert(`Edit ${row.name}`)}
      />
      <IconButton
        icon={<Trash2 className="w-3.5 h-3.5" />}
        size="xs"
        variant="ghost"
        tooltip="Delete"
        onClick={() => alert(`Delete ${row.name}`)}
      />
    </div>
  )
}

/** Simulates a real backend endpoint: does the filtering/sorting/paging out-of-band, over the wire. */
function fetchEmployeesFromServer(params: {
  search: string
  filters: FilterState
  sort: SortState | null
  page: number
  pageSize: number
}): Promise<{ rows: Employee[]; total: number }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      let rows = searchRows(EMPLOYEES, EMPLOYEE_COLUMNS, params.search)
      rows = filterRows(rows, EMPLOYEE_COLUMNS, params.filters)
      rows = sortRows(rows, EMPLOYEE_COLUMNS, params.sort)
      const total = rows.length
      resolve({ rows: paginateRows(rows, params.page, params.pageSize), total })
    }, 600)
  })
}

const VARIANTS: { id: TableVariant; label: string; icon: typeof Rows3 }[] = [
  { id: 'bordered', label: 'Bordered', icon: Rows4 },
  { id: 'minimal', label: 'Minimal', icon: Rows3 },
  { id: 'cards', label: 'Cards', icon: LayoutGrid },
]

export function TableDemo() {
  const [variant, setVariant] = useState<TableVariant>('bordered')

  // Server-side simulated state — the table never touches EMPLOYEES directly here,
  // it only renders whatever page `srvRows` holds and reports intent via the on*Change callbacks.
  const [srvSearch, setSrvSearch] = useState('')
  const [srvSort, setSrvSort] = useState<SortState | null>(null)
  const [srvFilters, setSrvFilters] = useState<FilterState>({})
  const [srvPage, setSrvPage] = useState(1)
  const [srvPageSize, setSrvPageSize] = useState(10)
  const [srvRows, setSrvRows] = useState<Employee[]>([])
  const [srvTotal, setSrvTotal] = useState(0)
  const [srvLoading, setSrvLoading] = useState(false)
  const [requestCount, setRequestCount] = useState(0)

  useEffect(() => {
    let cancelled = false
    setSrvLoading(true)
    fetchEmployeesFromServer({ search: srvSearch, filters: srvFilters, sort: srvSort, page: srvPage, pageSize: srvPageSize }).then(
      (res) => {
        if (cancelled) return
        setSrvRows(res.rows)
        setSrvTotal(res.total)
        setSrvLoading(false)
        setRequestCount((c) => c + 1)
      }
    )
    return () => {
      cancelled = true
    }
  }, [srvSearch, srvFilters, srvSort, srvPage, srvPageSize])

  return (
    <div className="space-y-8">
      {/* Client-side table with 3 selectable UI variants */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            Client-side Data Table
          </h2>
          <div className="flex items-center gap-1.5">
            {VARIANTS.map((v) => (
              <Button
                key={v.id}
                size="xs"
                variant={variant === v.id ? 'primary' : 'outline'}
                leftIcon={<v.icon className="w-3.5 h-3.5" />}
                onClick={() => setVariant(v.id)}
              >
                {v.label}
              </Button>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-400 -mt-2">
          All 42 rows are in the browser already — search, per-column filters, sorting, and pagination all run locally.
        </p>

        <DataTable
          key={variant}
          variant={variant}
          data={EMPLOYEES}
          columns={EMPLOYEE_COLUMNS}
          getRowId={(row) => row.id}
          searchPlaceholder="Search employees..."
          rowActions={rowActions}
        />
      </div>

      {/* Server-side simulated table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Server className="w-4 h-4 text-amber-400" />
            Server-side Data Table
          </h2>
          <span className="text-xs font-mono text-slate-500">{requestCount} request{requestCount === 1 ? '' : 's'} sent</span>
        </div>
        <p className="text-xs text-slate-400 -mt-2">
          The table only holds the current page. Every search keystroke, filter, sort click, or page change calls{' '}
          <code className="text-blue-400">onSearchChange</code> / <code className="text-blue-400">onSortChange</code> /{' '}
          <code className="text-blue-400">onFiltersChange</code> / <code className="text-blue-400">onPageChange</code>, which here
          re-issues a simulated 600ms network request (swap it for a real <code className="text-blue-400">fetch()</code> call).
        </p>

        <DataTable
          variant="bordered"
          serverSide
          data={srvRows}
          totalCount={srvTotal}
          isLoading={srvLoading}
          columns={EMPLOYEE_COLUMNS}
          getRowId={(row) => row.id}
          searchPlaceholder="Search employees..."
          search={srvSearch}
          onSearchChange={setSrvSearch}
          sort={srvSort}
          onSortChange={setSrvSort}
          filters={srvFilters}
          onFiltersChange={setSrvFilters}
          page={srvPage}
          onPageChange={setSrvPage}
          pageSize={srvPageSize}
          onPageSizeChange={setSrvPageSize}
          rowActions={rowActions}
        />
      </div>
    </div>
  )
}
