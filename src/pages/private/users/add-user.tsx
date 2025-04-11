import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { getRoles } from "@/core/services/role.service";
import { Loader2, Upload, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCreateUser } from "@/hooks/use-users";
import { User } from "@/core/types/user";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Role } from "@/core/types/role";

// Definir esquema de validación con zod
const userSchema = z.object({
    dni: z.string().min(8, "El DNI es requerido"),
    firstName: z.string().min(3, "El nombre es requerido"),
    lastName: z.string().min(3, "El apellido es requerido"),
    email: z.string().email("Formato de correo inválido").min(1, "El correo es requerido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
    roleId: z.number({
        required_error: "El rol es requerido",
    })
})

type UserFormValues = z.infer<typeof userSchema>;

const AddUser: React.FC = () => {
    const createUser = useCreateUser();

    const form = useForm<UserFormValues>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            dni: "",
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            roleId: undefined,
        }
    })

    const { toast } = useToast();
    const navigate = useNavigate();
    const [roles, setRoles] = useState<Role[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado de carga para el botón

    const onSubmit = async (data: any) => {
        setIsSubmitting(true); // Activamos el estado de carga
        try {
            await createUser.mutateAsync(data);
            navigate('/users');
        } catch (error) {
            console.error('Error al guardar el usuario:', error);
        } finally {
            setIsSubmitting(false); // Desactivar el estado de carga
        }
    }

    const getData = async () => {
        try {
            const response = await getRoles();
            setRoles(response);
        } catch (error) {
            console.error("Error al obtener roles:", error);
            toast({
                title: "Error al cargar los roles.",
                description: "Intenta nuevamente más adelante.",
                variant: "destructive",
            })
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="p-5 space-y-3">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={'/users'}>Usuarios</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Nuevo Usuario</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <Card>
                <CardHeader>
                    <CardTitle>Agregar nuevo usuario</CardTitle>
                    <CardDescription>Completa los campos del formulario.</CardDescription>
                </CardHeader>
                <CardContent>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nombre" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Apellido</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Apellido" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>


                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="dni"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>DNI</FormLabel>
                                            <FormControl>
                                                <Input placeholder="DNI" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Correo</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Correo" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contraseña</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Contraseña" type="password" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="roleId"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Rol</FormLabel>
                                            <Select
                                                onValueChange={(value) => field.onChange(parseInt(value))}
                                                defaultValue={field.value?.toString()}
                                                value={field.value?.toString()}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona un rol" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {roles?.map((role) => (
                                                        <SelectItem key={role.id} value={role.id.toString()}>
                                                            {role.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <CardFooter className="flex justify-center">
                                <Button type="submit" disabled={isSubmitting} className="mx-auto">
                                    {isSubmitting ? "Cargando..." : "Agregar usuario"}
                                </Button>
                            </CardFooter>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddUser;
