import React from 'react'
import { useField } from 'formik'
import { MultiSelect, type MultiSelectProps } from '../inputs/MultiSelect'

export interface FormikMultiSelectProps extends Omit<MultiSelectProps, 'value' | 'onChange'> {
  name: string
}

export const FormikMultiSelect: React.FC<FormikMultiSelectProps> = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const hasError = Boolean(meta.touched && meta.error)

  return (
    <MultiSelect
      {...props}
      value={field.value || []}
      onChange={(val) => {
        helpers.setValue(val)
        helpers.setTouched(true)
      }}
      error={hasError ? meta.error : props.error}
    />
  )
}
