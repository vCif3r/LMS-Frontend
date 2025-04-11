import { Skeleton } from "@/components/ui/skeleton"

export const CourseDetailSkeleton = () => {
  return (
    <div className="p-4 grid grid-cols-12 gap-2">
        <div className="col-span-12 xl:col-span-8 space-y-4">
            <Skeleton className="w-full h-[400px] rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="w-[300px] rounded-xl" />
                <Skeleton className="w-[100px] rounded-xl" />
            </div>
            
            <Skeleton className="w-full rounded-xl" />
            <Skeleton className="w-full rounded-xl" />
            <Skeleton className="w-full rounded-xl" />
            <Skeleton className="w-[190px] rounded-xl" />
        </div>
        
        <div className="col-span-4">

        </div>
    </div>
  )
}
