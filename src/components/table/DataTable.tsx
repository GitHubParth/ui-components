import React, { useMemo } from 'react'
import {
  Search,
  X,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Inbox,
  SlidersHorizontal,
} from 'lucide-react'
import type { ColumnDef, DataTableProps, FilterState, SortState } from './types'
import { useControllable } from './useControllable'
import { filterRows, getColumnValue, paginateRows, searchRows, sortRows } from './process'

const ALIGN_CLASS = { left: 'text-left', center: 'text-center', right: 'text-right' } as const

export function DataTable<T>(props: DataTableProps<T>) {
  const {
    data,
    columns,
    getRowId,
    variant = 'bordered',
    searchable = true,
    searchPlaceholder = 'Search...',
    search: searchProp,
    onSearchChange,
    sort: sortProp,
    onSortChange,
    defaultSort = null,
    filters: filtersProp,
    onFiltersChange,
    page: pageProp,
    onPageChange,
    pageSize: pageSizeProp,
    onPageSizeChange,
    pageSizeOptions = [5, 10, 25, 50],
    serverSide = false,
    totalCount,
    isLoading = false,
    emptyMessage = 'No results found.',
    rowActions,
    className = '',
  } = props

  const [search, setSearchRaw] = useControllable(searchProp, onSearchChange, '')
  const [sort, setSortRaw] = useControllable<SortState | null>(sortProp, onSortChange, defaultSort)
  const [filters, setFiltersRaw] = useControllable<FilterState>(filtersProp, onFiltersChange, {})
  const [page, setPage] = useControllable(pageProp, onPageChange, 1)
  const [pageSize, setPageSize] = useControllable(pageSizeProp, onPageSizeChange, pageSizeOptions[1] ?? 10)

  const setSearch = (value: string) => {
    setSearchRaw(value)
    setPage(1)
  }

  const setFilters = (next: FilterState) => {
    setFiltersRaw(next)
    setPage(1)
  }

  const toggleSort = (key: string) => {
    let next: SortState | null
    if (!sort || sort.key !== key) next = { key, direction: 'asc' }
    else if (sort.direction === 'asc') next = { key, direction: 'desc' }
    else next = null
    setSortRaw(next)
    setPage(1)
  }

  const processedRows = useMemo(() => {
    if (serverSide) return data
    let rows = data
    if (searchable) rows = searchRows(rows, columns, search)
    rows = filterRows(rows, columns, filters)
    rows = sortRows(rows, columns, sort)
    return rows
  }, [data, columns, search, filters, sort, serverSide, searchable])

  const total = serverSide ? totalCount ?? data.length : processedRows.length
  const pageRows = serverSide ? data : paginateRows(processedRows, page, pageSize)
  const totalPages = Math.max(1, Math.ceil(total / pageSize))
  const filterableColumns = columns.filter((c) => c.filterable)
  const activeFilterCount = Object.values(filters).filter((v) => v).length

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <TableToolbar
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        search={search}
        onSearchChange={setSearch}
        columns={filterableColumns}
        filters={filters}
        onFiltersChange={setFilters}
        activeFilterCount={activeFilterCount}
      />

      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/60 backdrop-blur-[1px] rounded-2xl">
            <div className="flex items-center gap-2 text-sm text-slate-300 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl shadow-lg">
              <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
              Loading...
            </div>
          </div>
        )}

        {pageRows.length === 0 && !isLoading ? (
          <EmptyState message={emptyMessage} />
        ) : variant === 'cards' ? (
          <CardsBody rows={pageRows} columns={columns} getRowId={getRowId} sort={sort} onToggleSort={toggleSort} rowActions={rowActions} />
        ) : (
          <TableBody
            variant={variant}
            rows={pageRows}
            columns={columns}
            getRowId={getRowId}
            sort={sort}
            onToggleSort={toggleSort}
            rowActions={rowActions}
          />
        )}
      </div>

      <PaginationBar
        page={page}
        totalPages={totalPages}
        total={total}
        pageSize={pageSize}
        pageSizeOptions={pageSizeOptions}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size)
          setPage(1)
        }}
      />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Toolbar: global search + per-column filters
// ---------------------------------------------------------------------------

function TableToolbar<T>({
  searchable,
  searchPlaceholder,
  search,
  onSearchChange,
  columns,
  filters,
  onFiltersChange,
  activeFilterCount,
}: {
  searchable: boolean
  searchPlaceholder: string
  search: string
  onSearchChange: (v: string) => void
  columns: ColumnDef<T>[]
  filters: FilterState
  onFiltersChange: (f: FilterState) => void
  activeFilterCount: number
}) {
  if (!searchable && columns.length === 0) return null

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2.5">
        {searchable && (
          <div className="relative flex-1 min-w-48">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full bg-slate-900/80 text-slate-100 text-xs sm:text-sm rounded-lg border border-slate-800 hover:border-slate-700 focus:border-blue-500/80 focus:ring-3 focus:ring-blue-500/15 focus:outline-none pl-8.5 pr-8 py-2 transition-all placeholder:text-slate-500"
            />
            {search && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={() => onFiltersChange({})}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-400 hover:text-rose-300 px-2.5 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
            Clear {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}
          </button>
        )}
      </div>

      {columns.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Filters
          </span>
          {columns.map((col) => (
            <ColumnFilterControl
              key={col.key}
              column={col}
              value={filters[col.key] ?? ''}
              onChange={(v) => onFiltersChange({ ...filters, [col.key]: v })}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function ColumnFilterControl<T>({
  column,
  value,
  onChange,
}: {
  column: ColumnDef<T>
  value: string
  onChange: (v: string) => void
}) {
  const baseClass =
    'bg-slate-900/80 text-slate-200 text-xs rounded-lg border border-slate-800 hover:border-slate-700 focus:border-blue-500/80 focus:ring-2 focus:ring-blue-500/15 focus:outline-none px-2.5 py-1.5 transition-all'

  if (column.filterType === 'select') {
    return (
      <select value={value} onChange={(e) => onChange(e.target.value)} className={`${baseClass} cursor-pointer`}>
        <option value="">{column.filterPlaceholder ?? `All ${column.header}`}</option>
        {column.filterOptions?.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    )
  }

  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={column.filterPlaceholder ?? column.header}
      className={`${baseClass} w-32 placeholder:text-slate-500`}
    />
  )
}

// ---------------------------------------------------------------------------
// Sort icon + header cell
// ---------------------------------------------------------------------------

function SortIcon({ active, direction }: { active: boolean; direction?: 'asc' | 'desc' }) {
  if (!active) return <ChevronsUpDown className="w-3.5 h-3.5 text-slate-600" />
  return direction === 'asc' ? (
    <ChevronUp className="w-3.5 h-3.5 text-blue-400" />
  ) : (
    <ChevronDown className="w-3.5 h-3.5 text-blue-400" />
  )
}

// ---------------------------------------------------------------------------
// Variant 1 & 2: classic <table> (bordered / minimal)
// ---------------------------------------------------------------------------

function TableBody<T>({
  variant,
  rows,
  columns,
  getRowId,
  sort,
  onToggleSort,
  rowActions,
}: {
  variant: 'bordered' | 'minimal'
  rows: T[]
  columns: ColumnDef<T>[]
  getRowId: (row: T) => string | number
  sort: SortState | null
  onToggleSort: (key: string) => void
  rowActions?: (row: T) => React.ReactNode
}) {
  const isBordered = variant === 'bordered'

  return (
    <div className={isBordered ? 'overflow-x-auto rounded-2xl border border-slate-800' : 'overflow-x-auto border-t border-slate-800'}>
      <table className="w-full text-xs sm:text-sm">
        <thead className={isBordered ? 'bg-slate-900/80' : ''}>
          <tr className={isBordered ? 'border-b border-slate-800' : 'border-b border-slate-800/80'}>
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ width: col.width }}
                className={`h-11 px-4 font-semibold uppercase tracking-wider text-slate-400 text-xs ${ALIGN_CLASS[col.align ?? 'left']}`}
              >
                {col.sortable ? (
                  <button
                    type="button"
                    onClick={() => onToggleSort(col.key)}
                    className="inline-flex items-center gap-1.5 hover:text-slate-200 transition-colors cursor-pointer select-none"
                  >
                    {col.header}
                    <SortIcon active={sort?.key === col.key} direction={sort?.key === col.key ? sort.direction : undefined} />
                  </button>
                ) : (
                  col.header
                )}
              </th>
            ))}
            {rowActions && <th className="h-11 px-4" />}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={getRowId(row)}
              className={
                isBordered
                  ? `border-b border-slate-800/80 last:border-0 hover:bg-slate-800/40 transition-colors ${
                      i % 2 === 1 ? 'bg-slate-950/30' : ''
                    }`
                  : 'border-b border-slate-800/50 last:border-0 hover:bg-slate-900/60 transition-colors'
              }
            >
              {columns.map((col) => {
                const value = getColumnValue(row, col)
                return (
                  <td
                    key={col.key}
                    className={`px-4 py-3 text-slate-200 ${ALIGN_CLASS[col.align ?? 'left']} ${col.className ?? ''}`}
                  >
                    {col.render ? col.render(row, value) : String(value ?? '—')}
                  </td>
                )
              })}
              {rowActions && <td className="px-4 py-3 text-right">{rowActions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Variant 3: stacked cards
// ---------------------------------------------------------------------------

function CardsBody<T>({
  rows,
  columns,
  getRowId,
  sort,
  onToggleSort,
  rowActions,
}: {
  rows: T[]
  columns: ColumnDef<T>[]
  getRowId: (row: T) => string | number
  sort: SortState | null
  onToggleSort: (key: string) => void
  rowActions?: (row: T) => React.ReactNode
}) {
  const sortableColumns = columns.filter((c) => c.sortable)
  const [primary, ...rest] = columns

  return (
    <div className="flex flex-col gap-3">
      {sortableColumns.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0">Sort by</span>
          {sortableColumns.map((col) => {
            const active = sort?.key === col.key
            return (
              <button
                key={col.key}
                type="button"
                onClick={() => onToggleSort(col.key)}
                className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
                  active
                    ? 'bg-blue-600/15 border-blue-500/30 text-blue-300'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {col.header}
                <SortIcon active={active} direction={active ? sort?.direction : undefined} />
              </button>
            )
          })}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
        {rows.map((row) => {
          const primaryValue = getColumnValue(row, primary)
          return (
            <div
              key={getRowId(row)}
              className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4 shadow-sm hover:border-slate-700 transition-colors flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="text-sm font-semibold text-white truncate">
                  {primary.render ? primary.render(row, primaryValue) : String(primaryValue ?? '—')}
                </div>
                {rowActions && <div className="shrink-0">{rowActions(row)}</div>}
              </div>

              <dl className="grid grid-cols-1 gap-2 text-xs">
                {rest.map((col) => {
                  const value = getColumnValue(row, col)
                  return (
                    <div key={col.key} className="flex items-center justify-between gap-3 border-t border-slate-800/70 pt-2 first:border-0 first:pt-0">
                      <dt className="text-slate-500 font-medium shrink-0">{col.header}</dt>
                      <dd className="text-slate-200 text-right truncate">
                        {col.render ? col.render(row, value) : String(value ?? '—')}
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Empty state + pagination
// ---------------------------------------------------------------------------

function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-14 rounded-2xl border border-dashed border-slate-800 text-slate-500">
      <Inbox className="w-8 h-8" />
      <p className="text-sm">{message}</p>
    </div>
  )
}

function PaginationBar({
  page,
  totalPages,
  total,
  pageSize,
  pageSizeOptions,
  onPageChange,
  onPageSizeChange,
}: {
  page: number
  totalPages: number
  total: number
  pageSize: number
  pageSizeOptions: number[]
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}) {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1
  const end = Math.min(page * pageSize, total)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
      <div className="flex items-center gap-2">
        <span>
          Showing <span className="text-slate-200 font-medium">{start}-{end}</span> of{' '}
          <span className="text-slate-200 font-medium">{total}</span>
        </span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="bg-slate-900/80 border border-slate-800 hover:border-slate-700 rounded-lg px-2 py-1 text-xs text-slate-300 focus:outline-none focus:border-blue-500/80 cursor-pointer"
        >
          {pageSizeOptions.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="inline-flex items-center justify-center w-7 h-7 rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>
        <span className="px-2 text-slate-300 font-medium">
          Page {page} of {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          className="inline-flex items-center justify-center w-7 h-7 rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
