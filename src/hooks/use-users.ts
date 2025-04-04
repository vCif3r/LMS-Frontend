import { UsersApi } from "@/core/services/user.service";
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
    mutationFn: (formData: FormData) => UsersApi.create(formData),
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