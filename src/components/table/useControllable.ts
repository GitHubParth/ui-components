import { useState, useCallback } from 'react'

/**
 * Standard controlled/uncontrolled state pair: if `value` is provided, the caller
 * owns the state and we just forward changes via `onChange`. Otherwise we manage
 * an internal fallback state so the component works standalone too.
 */
export function useControllable<T>(
  value: T | undefined,
  onChange: ((next: T) => void) | undefined,
  defaultValue: T
): [T, (next: T) => void] {
  const [internal, setInternal] = useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : internal

  const set = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )

  return [current, set]
}
