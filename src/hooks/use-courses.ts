import { courseApi } from "@/core/services/course.service";
import { CreateCourse } from "@/core/types/course";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"

export const useCourses = (filters: any = {}) => {
    return useQuery({
        queryKey: ['courses', filters],
        queryFn: () => courseApi.getAll(filters)
    });
}

export const useCreateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({course, image}: {course: CreateCourse, image?: File}) => courseApi.create(course, image),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['courses']})
            toast.success('Curso creado correctamente')
        },
        onError: () => {
            toast.error('Error al crear el curso')
        }
    })
}

export function useCourse (courseId: string | undefined) {
    return useQuery({
        queryKey: ['course', courseId],
        queryFn: () => courseApi.findById(courseId!),
        enabled: !!courseId
    })
}