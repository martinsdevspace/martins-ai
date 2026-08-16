import { SkeletonBackLink, SkeletonBar, SkeletonCard } from '@/components/Skeleton'

export default function Loading() {
  return (
    <article className="px-5 lg:px-[6vw] pt-24 pb-24">
      <SkeletonBackLink />

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7 flex flex-col gap-4">
          <SkeletonBar className="h-12 w-12" />
          <SkeletonBar className="h-14 w-3/4 max-w-xl" />
          <SkeletonBar className="h-5 w-1/2 max-w-md" />
        </div>

        <div className="lg:col-span-5">
          <SkeletonCard className="h-56 w-full" />
        </div>
      </div>

      <div className="mt-16 max-w-3xl flex flex-col gap-3">
        <SkeletonBar className="h-4 w-full" />
        <SkeletonBar className="h-4 w-5/6" />
        <SkeletonBar className="h-4 w-2/3" />
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <SkeletonCard className="h-40 w-full" />
        <SkeletonCard className="h-40 w-full" />
      </div>
    </article>
  )
}