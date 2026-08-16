import { SkeletonBar, SkeletonCard } from '@/components/Skeleton'

export default function Loading() {
  return (
    <article className="pt-16 pb-24">
      <div className="px-5 lg:px-[6vw]">
        <SkeletonBar className="h-6 w-64" />
        <SkeletonBar className="mt-6 h-16 w-3/4 max-w-2xl" />
        <SkeletonBar className="mt-4 h-6 w-1/2 max-w-lg" />
      </div>

      <div className="mt-16 px-5 lg:px-[6vw] flex flex-col gap-10">
        <SkeletonCard className="h-48 w-full" />
        <SkeletonCard className="h-48 w-full" />
        <SkeletonCard className="h-48 w-full" />
      </div>
    </article>
  )
}