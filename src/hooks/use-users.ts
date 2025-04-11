import { UsersApi } from "@/core/services/user.service";
import { User } from "@/core/types/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner"

export const useUsers = (filters: any = {}) => {
  return useQuery({
    queryKey: ["users", filters],
    queryFn: () => UsersApi.getAll(filters),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user: Omit<User, 'id'>) => UsersApi.create(user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success("Usuario creado exitosamente")
    },
    onError: (error) => {
      toast.error("Error al crear el usuario")
      console.error(error);
    }
  })
};

export function useUpdateUser() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) => 
      UsersApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', variables.id] });
      toast.success('Usuario actualizado con éxito');
    },
    onError: (error) => {
      toast.error('Error al actualizar el usuario');
      console.error(error);
    },
  });
}

export function useUser(id: string | undefined) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => UsersApi.getById(id!),
    enabled: !!id, // Solo ejecutar si existe un ID
  });
}

export const useDeleteUser = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => UsersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success("Usuario eliminado exitosamente")
    },
    onError: (error) => {
      toast.error("Error al eliminar el usuario")
      console.error(error);
    }
  })
}