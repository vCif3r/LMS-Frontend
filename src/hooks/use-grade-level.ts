import { gradeLevelApi } from "@/core/services/grade-level.service";
import { GradeLevel } from "@/core/types/grade-level";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"

export const useGradeLevels = (filters: any = {}) => {
    return useQuery({
        queryKey: ["gradeLevels", filters],
        queryFn: () => gradeLevelApi.getAll(filters),
    })
}

export const useCreateGradeLevel = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (gradeLevel: Omit<GradeLevel, 'id'>) => gradeLevelApi.create(gradeLevel),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gradeLevels'] });
            toast.success("Grado creado exitosamente")
        },
        onError: (error) => {
            console.error(error);
            toast.error("Error al crear el grado")
        }
    })
};

export function useUpdateGradeLevel() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: GradeLevel) => gradeLevelApi.update(data.id, data),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['gradeLevels'] });
            queryClient.invalidateQueries({ queryKey: ['gradeLevel', variables.id] });
            toast.success('Grado actualizado con éxito');
        },
        onError: (error) => {
            toast.error('Error al actualizar el grado');
            console.error(error);
        },
    });
}

export function useGradeLevel(id: string | undefined) {
    return useQuery({
        queryKey: ['gradeLevel', id],
        queryFn: () => gradeLevelApi.getById(id!),
        enabled: !!id, // Solo ejecutar si existe un ID
    });
}

export function useGradeLevelByName(name: string | undefined) {
    return useQuery({
        queryKey: ['gradeLevelByName', name],
        queryFn: () => gradeLevelApi.findByName(name),
        enabled: !!name, // Solo ejecutar si existe un nombre
    });
}