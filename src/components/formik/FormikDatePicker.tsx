import React from 'react'
import { useField } from 'formik'
import { DatePicker, type DatePickerProps } from '../inputs/DatePicker'

export interface FormikDatePickerProps extends Omit<DatePickerProps, 'value' | 'onChange'> {
  name: string
}

export const FormikDatePicker: React.FC<FormikDatePickerProps> = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const hasError = Boolean(meta.touched && meta.error)

  return (
    <DatePicker
      {...props}
      value={field.value || ''}
      onChange={(val) => {
        helpers.setValue(val)
        helpers.setTouched(true)
      }}
      error={hasError ? meta.error : props.error}
    />
  )
}
