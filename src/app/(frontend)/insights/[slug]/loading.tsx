import { SkeletonBackLink, SkeletonBar } from '@/components/Skeleton'

export default function Loading() {
  return (
    <article className="px-5 lg:px-[6vw] pt-24 pb-24">
      <SkeletonBackLink />

      <header className="mt-10 max-w-3xl">
        <div className="flex flex-wrap items-center gap-2">
          <SkeletonBar className="h-6 w-24" />
          <SkeletonBar className="h-6 w-20" />
        </div>
        <SkeletonBar className="mt-4 h-14 w-3/4 max-w-2xl" />
      </header>

      <div className="mt-12 max-w-3xl border-t border-border pt-10 flex flex-col gap-3">
        <SkeletonBar className="h-4 w-full" />
        <SkeletonBar className="h-4 w-5/6" />
        <SkeletonBar className="h-4 w-2/3" />
        <SkeletonBar className="h-4 w-3/4" />
        <SkeletonBar className="h-4 w-1/2" />
      </div>
    </article>
  )
}