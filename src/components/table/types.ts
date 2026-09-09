import type { ReactNode } from 'react'

export type SortDirection = 'asc' | 'desc'

export interface SortState {
  key: string
  direction: SortDirection
}

export interface FilterState {
  [columnKey: string]: string
}

export interface ColumnFilterOption {
  value: string
  label: string
}

export interface ColumnDef<T> {
  /** Unique key for this column. Also used as the default accessor: `row[key]`. */
  key: string
  header: string
  /** Custom value getter, used for sorting/filtering/search when the value isn't a direct property. */
  accessor?: (row: T) => unknown
  /** Custom cell renderer. Receives the row and the resolved (accessor'd) value. */
  render?: (row: T, value: unknown) => ReactNode
  sortable?: boolean
  filterable?: boolean
  filterType?: 'text' | 'select'
  filterOptions?: ColumnFilterOption[]
  filterPlaceholder?: string
  align?: 'left' | 'center' | 'right'
  width?: string
  className?: string
}

export type TableVariant = 'bordered' | 'minimal' | 'cards'

export interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  getRowId: (row: T) => string | number
  variant?: TableVariant

  // Global search
  searchable?: boolean
  searchPlaceholder?: string
  search?: string
  onSearchChange?: (value: string) => void

  // Column sorting
  sort?: SortState | null
  onSortChange?: (sort: SortState | null) => void
  defaultSort?: SortState | null

  // Column filtering
  filters?: FilterState
  onFiltersChange?: (filters: FilterState) => void

  // Pagination
  page?: number
  onPageChange?: (page: number) => void
  pageSize?: number
  onPageSizeChange?: (pageSize: number) => void
  pageSizeOptions?: number[]

  /**
   * When true, `data` is assumed to already be the current page's filtered + sorted rows
   * (fetched from a server). The table stops doing any local processing and instead
   * calls onSearchChange / onSortChange / onFiltersChange / onPageChange so the caller
   * can refetch. `totalCount` is then required to render pagination correctly.
   */
  serverSide?: boolean
  totalCount?: number
  isLoading?: boolean

  emptyMessage?: string
  rowActions?: (row: T) => ReactNode
  className?: string
}
