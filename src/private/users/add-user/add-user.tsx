import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import Layout from "@/core/layout/layout";

const AddUser = () => {
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

    const getRoles = async () => {
        try {
            const response = await axios.get("http://localhost:3000/roles");
            const result = response.data;
            setRoles(result);
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
        getRoles();
    }, []);

    return (
        <Layout>
            <div className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Agregar nuevo usuario</CardTitle>
                        <CardDescription>Completa los campos del formulario.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent>
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
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? "Cargando..." : "Agregar"}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </Layout>
    );
};

export default AddUser;
