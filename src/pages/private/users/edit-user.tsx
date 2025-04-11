import { useUpdateUser, useUser } from '@/hooks/use-users';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Upload, X } from 'lucide-react';

const formSchema = z.object({
    firstName: z.string().min(3, { message: 'Campo requerido' }),
    lastName: z.string().min(3, { message: 'Campo requerido' }),
    dni: z.string().min(8, { message: 'Campo requerido' }),
    email: z.string().email({ message: 'Email inválido' }),
    roleId: z.number({
        required_error: 'Campo requerido',
    })
})
type UserFormValues = z.infer<typeof formSchema>;

const EditUser: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const updateUser = useUpdateUser();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { data: user, isLoading: isLoadingUser } = useUser(id);

    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const form = useForm<UserFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            dni: '',
            email: '',
            roleId: undefined,
        },
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            setImage(selectedFile);

            // Crear preview de la imagen
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const onSubmit = async (data: UserFormValues) => {
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('firstName', data.firstName);
            formData.append('lastName', data.lastName);
            formData.append('dni', data.dni);
            formData.append('email', data.email);
            formData.append('roleId', data.roleId.toString());

            if (!id) {
                console.error('User ID is undefined');
                return;
            }
            await updateUser.mutateAsync({ id, data: formData });
            navigate('/users');
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }



    useEffect(() => {

        if (user) {
            console.log('User data:', user);
            form.reset({
                firstName: user.firstName,
                lastName: user.lastName,
                dni: user.dni,
                email: user.email,
                roleId: user.roleId,
            });
        }
    }, [user, form])

    return (
        <>
            <div className='p-5 space-y-3'>
                <Card>
                    <CardHeader>
                        <CardTitle>Editar Usuario</CardTitle>
                        <CardDescription>Actualiza la información del usuario</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                                    <div className="space-y-4">
                                        <FormField
                                            control={form.control}
                                            name="firstName"
                                            render={({ field }) => (
                                                <div className="grid w-full items-center gap-1.5">
                                                    <Label className="text-sm font-medium">Nombre</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Nombre"
                                                        {...field}
                                                        className="border rounded-md p-2 w-full"
                                                    />
                                                    {form.formState.errors.firstName && (
                                                        <span className="text-red-500 text-sm">{form.formState.errors.firstName.message}</span>
                                                    )}
                                                </div>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="lastName"
                                            render={({ field }) => (
                                                <div className="grid w-full items-center gap-1.5">
                                                    <Label className="text-sm font-medium">Apellido</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="Apellido"
                                                        {...field}
                                                        className="border rounded-md p-2 w-full"
                                                    />
                                                    {form.formState.errors.lastName && (
                                                        <span className="text-red-500 text-sm">{form.formState.errors.lastName.message}</span>
                                                    )}
                                                </div>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="dni"
                                            render={({ field }) => (
                                                <div className="grid w-full items-center gap-1.5">
                                                    <Label className="text-sm font-medium">DNI</Label>
                                                    <Input
                                                        type="text"
                                                        placeholder="DNI"
                                                        {...field}
                                                        className="border rounded-md p-2 w-full"
                                                    />
                                                    {form.formState.errors.firstName && (
                                                        <span className="text-red-500 text-sm">{form.formState.errors.firstName.message}</span>
                                                    )}
                                                </div>
                                            )}
                                        />
                                    </div>

                                    <div>
                                        <div className="space-y-2">
                                            <Label htmlFor="image">Imagen</Label>
                                            <Input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />

                                            {imagePreview && (
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500 mb-2">Vista previa:</p>
                                                    <img
                                                        src={imagePreview}
                                                        alt="Vista previa"
                                                        className="max-h-40 rounded-md object-cover"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                </div>


                            </form>

                        </Form>
                    </CardContent>
                </Card>
            </div>

        </>
    )
}

export default EditUser