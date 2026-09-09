import React from 'react'
import { useField } from 'formik'
import { Checkbox, type CheckboxProps } from '../inputs/Checkbox'

export interface FormikCheckboxProps extends Omit<CheckboxProps, 'checked' | 'onChange'> {
  name: string
}

export const FormikCheckbox: React.FC<FormikCheckboxProps> = ({ name, ...props }) => {
  const [field, meta, helpers] = useField({ name, type: 'checkbox' })
  const hasError = Boolean(meta.touched && meta.error)

  return (
    <Checkbox
      {...props}
      checked={Boolean(field.value)}
      onChange={(checked) => {
        helpers.setValue(checked)
        helpers.setTouched(true)
      }}
      error={hasError ? meta.error : props.error}
    />
  )
}
