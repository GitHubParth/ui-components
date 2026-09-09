import React from 'react'
import { useField } from 'formik'
import { TextArea, type TextAreaProps } from '../inputs/TextArea'

export interface FormikTextAreaProps extends Omit<TextAreaProps, 'name' | 'value' | 'onChange' | 'onBlur'> {
  name: string
}

export const FormikTextArea: React.FC<FormikTextAreaProps> = ({ name, ...props }) => {
  const [field, meta] = useField(name)
  const hasError = Boolean(meta.touched && meta.error)

  return (
    <TextArea
      {...props}
      {...field}
      error={hasError ? meta.error : props.error}
    />
  )
}
