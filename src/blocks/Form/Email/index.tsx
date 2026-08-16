import type { EmailField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Email: React.FC<
  EmailField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
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
      <Input
        defaultValue={defaultValue}
        id={name}
        type="email"
        placeholder={''}
        className="bg-transparent border-border border-b rounded-none px-0 py-3 font-mono text-base focus-visible:ring-0 focus-visible:border-synthesis"
        {...register(name, { pattern: /^\S[^\s@]*@\S+$/, required })}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}