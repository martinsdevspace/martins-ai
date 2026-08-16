import { cn } from '@/utilities/ui'
import NextImage from 'next/image'
import React from 'react'

export type FittingType = 'fill' | 'cover' | 'contain'

type Props = {
  alt?: string
  className?: string
  fittingType?: FittingType
  priority?: boolean
  sizes?: string
  src: string
}

/**
 * Thin wrapper around next/image exposing the `fittingType` API used by the
 * ported portfolio components.
 *
 * - `fill` / `cover`: object-cover inside a sized, relatively-positioned parent
 * - `contain`: object-contain inside a sized, relatively-positioned parent
 *
 * Requires the parent element to have `position: relative` (or `relative`) and
 * explicit dimensions (aspect-ratio utilities, fixed heights, etc.).
 */
export const Image: React.FC<Props> = ({
  alt = '',
  className,
  fittingType = 'cover',
  priority,
  sizes,
  src,
}) => {
  const objectFit =
    fittingType === 'contain' ? 'object-contain' : fittingType === 'fill' ? 'object-cover' : 'object-cover'

  return (
    <NextImage
      alt={alt}
      className={cn('h-full w-full', objectFit, className)}
      fill
      priority={priority}
      sizes={sizes}
      src={src}
    />
  )
}
