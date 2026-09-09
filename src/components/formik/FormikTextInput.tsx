import React from 'react'
import { useField } from 'formik'
import { TextInput, type TextInputProps } from '../inputs/TextInput'

export interface FormikTextInputProps extends Omit<TextInputProps, 'name' | 'value' | 'onChange' | 'onBlur'> {
  name: string
}

export const FormikTextInput: React.FC<FormikTextInputProps> = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const hasError = Boolean(meta.touched && meta.error)

  return (
    <TextInput
      {...props}
      {...field}
      error={hasError ? meta.error : props.error}
      onClear={() => helpers.setValue('')}
    />
  )
}
