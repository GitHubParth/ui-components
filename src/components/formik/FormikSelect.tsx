import React from 'react'
import { useField } from 'formik'
import { Select, type SelectProps } from '../inputs/Select'

export interface FormikSelectProps extends Omit<SelectProps, 'value' | 'onChange'> {
  name: string
}

export const FormikSelect: React.FC<FormikSelectProps> = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const hasError = Boolean(meta.touched && meta.error)

  return (
    <Select
      {...props}
      value={field.value}
      onChange={(val) => {
        helpers.setValue(val)
        helpers.setTouched(true)
      }}
      error={hasError ? meta.error : props.error}
    />
  )
}
