import { useCourse } from "@/hooks/use-courses";
import { useParams } from "react-router-dom";
import { CourseDetailSkeleton } from "./CourseDetailSkeleton";
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

const CourseDetail: React.FC = () => {
    const { courseId } = useParams<{ courseId: string }>();

    const { data, isLoading, isError } = useCourse(courseId);

    if (isLoading) {
        <CourseDetailSkeleton />
    }

    if (isError) {
        <div>Error al cargar el curso</div>
    }

    return (
        <div className="p-4 grid grid-cols-12 gap-4">
            <div className="col-span-12 xl:col-span-9 space-y-4">
                <img src={data?.imageUrl} alt={data?.name} className="w-full h-[400px] object-cover rounded-md" />
                <h1 className="font-bold text-2xl">{data?.name}</h1>
                <div className="flex gap-2">
                    <Badge variant={'secondary'}>{data?.gradeLevel.name}</Badge>
                    <Badge variant={'secondary'}>{data?.gradeLevel.level}</Badge>
                </div>
                <p dangerouslySetInnerHTML={{ __html: data?.description || '' }}></p>
                

                
            </div>
            <div className="col-span-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Anuncios</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
};

export default CourseDetail