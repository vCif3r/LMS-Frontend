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

// Definir esquema de validación con zod
const userSchema = z.object({
    dni: z.string().min(8, "El DNI es requerido"),
    firstName: z.string().min(3, "El nombre es requerido"),
    lastName: z.string().min(3, "El apellido es requerido"),
    email: z.string().email("Formato de correo inválido").min(1, "El correo es requerido"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
})

const AddUser: React.FC = () => {

    const { toast } = useToast();
    const navigate = useNavigate();
    const [roles, setRoles] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false); // Estado de carga para el botón

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        // Obtener los datos del formulario
        const formData = new FormData(event.target as HTMLFormElement);

        const newUser = {
            dni: formData.get("dni"),
            firstName: formData.get("firstName"),
            lastName: formData.get("lastName"),
            email: formData.get("email"),
            password: formData.get("password"),
            role: formData.get("role"),
        };
        setIsSubmitting(true); // Activamos el estado de carga
        try {
            // Enviar la solicitud para agregar el usuario
            await axios.post("http://localhost:3000/users", newUser);
            toast({
                title: "Usuario creado correctamente"
            })
            navigate('/users');
        } catch (error) {
            toast({
                title: "Error al agregar usuario. Intenta nuevamente.",
                variant: "destructive"
            })
        } finally {
            setIsSubmitting(false); // Desactivar el estado de carga
        }
    };

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
                <CardHeader className="text-center">
                    <CardTitle>Agregar nuevo usuario</CardTitle>
                    <CardDescription>Completa los campos del formulario.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit} className="w-6/12 mx-auto">
                    <CardContent>
                        <div>
                            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                                <div>
                                    <Label>Nombre</Label>
                                    <Input name="firstName" placeholder="Nombre" required />
                                </div>
                                <div>
                                    <Label>Apellido</Label>
                                    <Input name="lastName" placeholder="Apellido" required />
                                </div>
                            </div>
                            <div>
                                <Label>DNI</Label>
                                <Input name="dni" placeholder="DNI" required />
                            </div>
                            <div>
                                <Label>Correo</Label>
                                <Input name="email" placeholder="Correo" required />
                            </div>
                            <div>
                                <Label>Contraseña</Label>
                                <Input name="password" placeholder="Contraseña" type="password" required />
                            </div>
                            <div className="pb-2">
                                <Label>Rol</Label>
                                <select name="role" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" disabled={roles.length === 0}>
                                    {roles.length === 0 ? (
                                        <option hidden>No hay roles disponibles</option>
                                    ) : (
                                        roles.map((role: any) => (
                                            <option key={role.id} value={role.id}> {role.name}</option>
                                        ))
                                    )}
                                </select>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isSubmitting} className="mx-auto">
                            {isSubmitting ? "Cargando..." : "Agregar"}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default AddUser;
