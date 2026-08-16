import { cn } from '@/utilities/ui'

export function SkeletonBar({ className }: { className?: string }) {
  return <div className={cn('animate-pulse bg-border/60', className)} />
}

export function SkeletonCard({ className }: { className?: string }) {
  return <div className={cn('animate-pulse border border-border bg-card', className)} />
}

export function SkeletonBackLink() {
  return <SkeletonBar className="h-4 w-28" />
}