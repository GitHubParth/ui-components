import React from 'react'
import { useField } from 'formik'
import { Switch, type SwitchProps } from '../inputs/Switch'

export interface FormikSwitchProps extends Omit<SwitchProps, 'checked' | 'onChange'> {
  name: string
}

export const FormikSwitch: React.FC<FormikSwitchProps> = ({ name, ...props }) => {
  const [field, meta, helpers] = useField({ name, type: 'checkbox' })
  const hasError = Boolean(meta.touched && meta.error)

  return (
    <Switch
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
