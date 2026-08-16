import React from 'react'

import { cn } from '@/utilities/ui'

export const SectionLabel: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('font-mono-label text-synthesis flex items-center gap-2', className)}>
      <span className="w-1 h-1 bg-synthesis animate-pulse" />
      {children}
    </div>
  )
}

export const SectionHeading: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => {
  return (
    <h2
      className={cn(
        'font-heading text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-balance',
        className,
      )}
    >
      {children}
    </h2>
  )
}
