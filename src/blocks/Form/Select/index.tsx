import type { SelectField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import { cn } from '@/utilities/ui'
import { Label } from '@/components/ui/label'
import React from 'react'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'

export const Select: React.FC<
  SelectField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
  }
> = ({ name, control, errors, label, options, required, width, defaultValue }) => {
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
      <Controller
        control={control}
        defaultValue={defaultValue}
        name={name}
        render={({ field: { onChange, value } }) => {
          return (
            <div className="flex flex-wrap gap-2">
              {options.map(({ label: optionLabel, value: optionValue }) => {
                const selected = value === optionValue
                return (
                  <button
                    key={optionValue}
                    id={name}
                    type="button"
                    onClick={() => onChange(optionValue)}
                    aria-pressed={selected}
                    className={cn(
                      'font-mono text-[11px] tracking-wider px-3 py-2 border transition-colors cursor-pointer',
                      selected
                        ? 'bg-foreground text-background border-foreground'
                        : 'bg-transparent text-foreground/60 border-border hover:border-foreground hover:text-foreground',
                    )}
                  >
                    {optionLabel}
                  </button>
                )
              })}
            </div>
          )
        }}
        rules={{ required }}
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}