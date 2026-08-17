'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { IconSend } from '@tabler/icons-react'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <FormProvider {...formMethods}>
      {!isLoading && hasSubmitted && confirmationType === 'message' && (
        <div className="border border-synthesis p-8 lg:p-12">
          <RichText data={confirmationMessage} enableGutter={false} />
        </div>
      )}
      {isLoading && !hasSubmitted && (
        <p className="font-mono text-xs tracking-[0.15em] uppercase text-muted-foreground">
          <span className="w-2 h-2 bg-synthesis rounded-full animate-pulse inline-block mr-2 align-middle" />
          TRANSMITTING...
        </p>
      )}
      {error && (
        <div className="font-mono text-sm text-destructive">{`${error.status || '500'}: ${error.message || ''}`}</div>
      )}
      {!hasSubmitted && (
        <form id={formID} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {enableIntro && introContent && (
            <RichText className="mb-8" data={introContent} enableGutter={false} />
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFromProps &&
              formFromProps.fields &&
              formFromProps.fields?.map((field, index) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                if (Field) {
                  return (
                    <div
                      className={'width' in field && field.width && field.width < 100 ? undefined : 'md:col-span-2'}
                      key={index}
                    >
                      <Field
                        form={formFromProps}
                        {...field}
                        {...formMethods}
                        control={control}
                        errors={errors}
                        register={register}
                      />
                    </div>
                  )
                }
                return null
              })}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="group inline-flex items-center gap-3 bg-foreground text-background px-8 py-4 font-mono text-xs tracking-[0.15em] uppercase transition-all hover:bg-synthesis disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <span className="w-2 h-2 bg-synthesis rounded-full animate-pulse" />
                TRANSMITTING...
              </>
            ) : (
              <>
                <span className="w-2 h-2 bg-synthesis group-hover:bg-background rounded-full transition-colors" />
                {submitButtonLabel || 'SEND_MESSAGE'}
                <IconSend className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>
      )}
    </FormProvider>
  )
}