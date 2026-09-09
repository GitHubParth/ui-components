import React from 'react'
import { useField } from 'formik'
import { ColorPicker, type ColorPickerProps } from '../inputs/ColorPicker'

export interface FormikColorPickerProps extends Omit<ColorPickerProps, 'value' | 'onChange'> {
  name: string
}

export const FormikColorPicker: React.FC<FormikColorPickerProps> = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const hasError = Boolean(meta.touched && meta.error)

  return (
    <ColorPicker
      {...props}
      value={field.value || '#3B82F6'}
      onChange={(val) => {
        helpers.setValue(val)
        helpers.setTouched(true)
      }}
      error={hasError ? meta.error : props.error}
    />
  )
}
