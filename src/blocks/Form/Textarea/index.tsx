import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Label } from '@/components/ui/label'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
  }
> = ({ name, defaultValue, errors, label, register, required, rows = 6, width }) => {
  return (
    <Width width={width}>
      <Label htmlFor={name} className="font-mono-label text-muted-foreground mb-2 block">
        {label}
        {required && (
          <span className="text-synthesis">
            {' '}
            *<span className="sr-only">(required)</span>
          </span>
        )}
      </Label>
      <TextAreaComponent
        defaultValue={defaultValue}
        id={name}
        rows={rows}
        className="bg-transparent border-border border-b rounded-none px-0 py-3 font-mono text-base resize-none focus-visible:ring-0 focus-visible:border-synthesis"
        {...register(name, { required: required })}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}