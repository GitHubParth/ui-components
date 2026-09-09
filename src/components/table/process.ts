import type { ColumnDef, FilterState, SortState } from './types'

export function getColumnValue<T>(row: T, column: ColumnDef<T>): unknown {
  if (column.accessor) return column.accessor(row)
  return (row as Record<string, unknown>)[column.key]
}

function compareValues(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0
  if (a == null) return -1
  if (b == null) return 1

  if (typeof a === 'number' && typeof b === 'number') return a - b

  const aDate = a instanceof Date ? a.getTime() : NaN
  const bDate = b instanceof Date ? b.getTime() : NaN
  if (!Number.isNaN(aDate) && !Number.isNaN(bDate)) return aDate - bDate

  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' })
}

export function sortRows<T>(rows: T[], columns: ColumnDef<T>[], sort: SortState | null): T[] {
  if (!sort) return rows
  const column = columns.find((c) => c.key === sort.key)
  if (!column) return rows

  const sorted = [...rows].sort((a, b) => compareValues(getColumnValue(a, column), getColumnValue(b, column)))
  return sort.direction === 'desc' ? sorted.reverse() : sorted
}

export function filterRows<T>(rows: T[], columns: ColumnDef<T>[], filters: FilterState): T[] {
  const activeEntries = Object.entries(filters).filter(([, v]) => v != null && v !== '')
  if (activeEntries.length === 0) return rows

  return rows.filter((row) =>
    activeEntries.every(([key, filterValue]) => {
      const column = columns.find((c) => c.key === key)
      if (!column) return true
      const value = getColumnValue(row, column)
      if (column.filterType === 'select') {
        return String(value) === filterValue
      }
      return String(value ?? '').toLowerCase().includes(filterValue.toLowerCase())
    })
  )
}

export function searchRows<T>(rows: T[], columns: ColumnDef<T>[], query: string): T[] {
  if (!query.trim()) return rows
  const q = query.trim().toLowerCase()
  return rows.filter((row) =>
    columns.some((column) => String(getColumnValue(row, column) ?? '').toLowerCase().includes(q))
  )
}

export function paginateRows<T>(rows: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize
  return rows.slice(start, start + pageSize)
}
