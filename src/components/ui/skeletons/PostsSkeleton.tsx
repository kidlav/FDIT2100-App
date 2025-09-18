import { Skeleton } from "@/components/ui/skeleton"

export default function PostsSkeleton() {
  return (
    <>
      <div className="max-w-4xl mx-auto mt-8 space-y-4">
          <div className="flex justify-between space-x-4">
              <div className="w-[70%] space-x-4">
                <Skeleton className="mb-2 h-5 w-[300px] rounded-full" />
                <Skeleton className="mb-2 h-4 w-full rounded-full" />
                <Skeleton className="mb-2 h-4 w-full rounded-full" />
                <div className="flex mt-4 space-y-2">
                    <Skeleton className="h-4 w-[15%] mr-4 rounded-full" />
                    <Skeleton className="h-4 w-[20%] mr-4 rounded-full" />
                    <Skeleton className="h-4 w-[12%] mr-4 rounded-full" />
                </div>
              </div>
              <Skeleton className="w-[25%] h-[140px] rounded-lg" />
          </div>
      </div>

      <div className="max-w-4xl mx-auto mt-8 space-y-4">
      <div className="flex justify-between space-x-4">
          <div className="w-[70%] space-x-4">
            <Skeleton className="mb-2 h-5 w-[300px] rounded-full" />
            <Skeleton className="mb-2 h-4 w-full rounded-full" />
            <Skeleton className="mb-2 h-4 w-full rounded-full" />
            <div className="flex mt-4 space-y-2">
                <Skeleton className="h-4 w-[15%] mr-4 rounded-full" />
                <Skeleton className="h-4 w-[20%] mr-4 rounded-full" />
                <Skeleton className="h-4 w-[12%] mr-4 rounded-full" />
            </div>
          </div>
          <Skeleton className="w-[25%] h-[140px] rounded-lg" />
      </div>
      </div>
      </>
  );
}