import { SkeletonBackLink, SkeletonBar, SkeletonCard } from '@/components/Skeleton'

export default function Loading() {
  return (
    <article className="px-5 lg:px-[6vw] pt-24">
      <SkeletonBackLink />

      <div className="mt-10 flex flex-wrap items-center gap-2">
        <SkeletonBar className="h-6 w-24" />
        <SkeletonBar className="h-6 w-32" />
      </div>

      <SkeletonBar className="mt-4 h-14 w-3/4 max-w-3xl" />
      <SkeletonBar className="mt-8 h-16 w-2/3 max-w-2xl" />

      <SkeletonCard className="mt-10 h-24 max-w-3xl" />

      <div className="mt-16 flex max-w-3xl flex-col gap-4">
        <SkeletonCard className="h-32 w-full" />
        <SkeletonCard className="h-32 w-full" />
        <SkeletonCard className="h-32 w-full" />
      </div>
    </article>
  )
}