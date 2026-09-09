import React from 'react'
import { useField } from 'formik'
import { FileUpload, type FileUploadProps } from '../inputs/FileUpload'

export interface FormikFileUploadProps extends Omit<FileUploadProps, 'value' | 'onChange'> {
  name: string
}

export const FormikFileUpload: React.FC<FormikFileUploadProps> = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name)
  const hasError = Boolean(meta.touched && meta.error)

  return (
    <FileUpload
      {...props}
      value={field.value || []}
      onChange={(files) => {
        helpers.setValue(files)
        helpers.setTouched(true)
      }}
      error={hasError ? (meta.error as string) : props.error}
    />
  )
}
