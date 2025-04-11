import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Editor } from '@tinymce/tinymce-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { GradeLevel } from "@/core/types/grade-level";
import { gradeLevelApi } from "@/core/services/grade-level.service";
import { useCreateCourse } from "@/hooks/use-courses";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreateCourse } from "@/core/types/course";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
    name: z.string().min(4, { message: 'El nombre es obligatorio' }),
    description: z.string().min(10, { message: 'La descripción es obligatoria' }),
    gradeLevelId: z.string({
        required_error: "El grado es requerido",
    }),
    startDate: z.date(),
    endDate: z.date()
})

function FormCourse() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            description: '',
            gradeLevelId: undefined,
            startDate: undefined,
            endDate: undefined
        },
    });

    const [listGradeLevels, setListGradeLevels] = useState<GradeLevel[]>([]);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const { toast } = useToast();
    const [imagenFile, setImagenFile] = useState<File>();
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const createCourse = useCreateCourse();

    const loadGradeLevels = async (query?: string) => {
        try {
            const response = await gradeLevelApi.findByName(query || "");
            setListGradeLevels(response.data);
        } catch (error) {
            console.error('Error al cargar los niveles de grado:', error);
            toast({
                title: "Error al cargar niveles",
                description: "No se pudieron cargar los niveles de grado.",
                variant: "destructive"
            });
        }
    };
    useEffect(() => {
        loadGradeLevels(search);
    }, [search]);

    // Manejar cambio de imagen
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagenFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const cursoDto: CreateCourse = {
                name: values.name,
                description: values.description,
                gradeLevelId: values.gradeLevelId,
                startDate: values.startDate,
                endDate: values.endDate
            }
            await createCourse.mutateAsync({ course: cursoDto, image: imagenFile || undefined });
            navigate('/courses');
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Agregar nuevo curso</CardTitle>
                        <CardDescription>Completa todos los campos del formulario.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-12 gap-4">
                            {/* first column */}
                            <div className="col-span-12 xl:col-span-7 space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    rules={{ required: "El nombre es obligatorio", minLength: { value: 3, message: "El nombre debe tener al menos 3 caracteres" } }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nombre</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="description"
                                    rules={{ required: "La descripción es obligatoria" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Descripción</FormLabel>
                                            <FormControl>
                                                <Editor
                                                    apiKey='irfl7e6itq24e0fw7uevozwv6xgg8awfczpd11lto0vc22o3'
                                                    init={{
                                                        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                                                        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                                                    }}
                                                    initialValue=""
                                                    onEditorChange={field.onChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="gradeLevelId"
                                    rules={{ required: "Debes seleccionar un nivel de grado" }}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nivel de grado</FormLabel> <br />
                                            <Popover open={open} onOpenChange={setOpen}>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant="outline"
                                                            role="combobox"
                                                            aria-expanded={open}
                                                            className="w-[380px] justify-between"
                                                        >
                                                            {(() => {
                                                                const grado = listGradeLevels.find(grado => grado.id.toString() === field.value);
                                                                return grado ? (grado.name+' - '+grado.level) : "Selecciona un grado";
                                                            })()}
                                                            <ChevronsUpDown className="opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-[380px] p-0">
                                                    <div className="p-1.5">
                                                        <div className="relative flex-1">
                                                            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                                                            <Input
                                                                className="pl-9 text-sm"
                                                                value={search}
                                                                onChange={(e) => setSearch(e.target.value)}
                                                                placeholder="Escribe para buscar..."
                                                            />
                                                        </div>

                                                        {search.length === 0 && (
                                                            <div className="p-1.5 text-sm text-gray-400">Grados recientes...</div>
                                                        )}

                                                        {listGradeLevels.length > 0 && (
                                                            <div className="space-y-1">
                                                                {listGradeLevels.map((grado) => (
                                                                    <div
                                                                        key={grado.id}
                                                                        className={`p-1.5 cursor-pointer rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm flex items-center gap-1 ${field.value === grado.id.toString() ? 'bg-gray-100 dark:bg-zinc-800' : 'bg-transparent'}`}
                                                                        onClick={() => {
                                                                            field.onChange(grado.id.toString());
                                                                            setOpen(false);
                                                                        }}
                                                                    >
                                                                        {grado.name+' - '+grado.level}
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto h-4 w-4",
                                                                                field.value === grado.id ? "opacity-100" : "opacity-0"
                                                                            )}
                                                                        />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {listGradeLevels.length === 0 && (
                                                            <div className="p-1.5 text-sm text-center">No hay opciones disponibles</div>
                                                        )}
                                                    </div>
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="startDate"
                                        rules={{ required: "La fecha de inicio es obligatoria" }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Fecha inicio</FormLabel>
                                                <FormControl>
                                                    <DatePicker
                                                        date={field.value}
                                                        setDate={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="endDate"
                                        rules={{ required: "La fecha de fin es obligatoria" }}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Fecha fin</FormLabel>
                                                <FormControl>
                                                    <DatePicker
                                                        date={field.value}
                                                        setDate={field.onChange}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* second column - imagen */}
                            <div className="col-span-12 xl:col-span-5 space-y-2">
                                <FormLabel>Imagen del Curso</FormLabel>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="cursor-pointer"
                                />

                                {imagePreview && (
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500 mb-2">Vista previa:</p>
                                        <div className="relative w-full max-w-md rounded-md overflow-hidden border border-gray-200">
                                            <img
                                                src={imagePreview}
                                                alt="Vista previa"
                                                className="w-full object-cover max-h-64"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={createCourse.isLoading}>
                            {createCourse.isLoading ? "Creando..." : "Crear Curso"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}

export default FormCourse;