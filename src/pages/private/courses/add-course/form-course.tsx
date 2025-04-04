import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Editor } from '@tinymce/tinymce-react';
import { findByNameGradeLevel } from "@/core/services/grade-level.service";
import { GradeLevel } from "@/core/types/grade-level";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { createCourse } from "@/core/services/course.service";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

type FormValues = {
    name: string;
    description: string;
    gradeLevel: GradeLevel;
    startDate: Date;
    endDate: Date;
    picture: File;
};

function FormCourse() {

    const form = useForm<FormValues>({
        defaultValues: {
            name: "",
            description: "",
            gradeLevel: undefined,
            startDate: undefined,
            endDate: undefined,
            picture: undefined
        },
    });

    const [listGradeLevels, setListGradeLevels] = useState<GradeLevel[]>([]);
    const [search, setSearch] = useState('');

    const [open, setOpen] = useState(false)
    const { toast } = useToast();

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [endDate, setEndDate] = useState<Date | undefined>();
    const [previewImage, setPreviewImage] = useState<string | undefined>();
    const [selectedGradeLevel, setSelectedGradeLevel] = useState<GradeLevel>();

    const [error, setError] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);

    const loadGradeLevels = async (query?: string) => {
        try {
            const response = await findByNameGradeLevel(query || "");
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

    const onSubmit = async (data: FormValues) => {
        try {
          setIsLoading(true);
          
          if (data.startDate && data.endDate && data.startDate > data.endDate) {
            form.setError("endDate", {
              message: "La fecha de fin no puede ser anterior a la fecha de inicio"
            });
            setIsLoading(false);
            return;
          }
    
          // Crear objeto para el envío
          const courseData = {
            name: data.name,
            description: data.description,
            gradeLevel: data.gradeLevel,
            startDate: data.startDate,
            endDate: data.endDate,
            picture: data.picture
          };
    
          // Enviar datos
          await createCourse(courseData);
          
          // Mostrar mensaje de éxito
          toast({
            title: "Curso creado",
            description: "El curso se ha creado correctamente",
            variant: "default"
          });
    
          // Restablecer formulario
          form.reset();
          setPreviewImage(undefined);
        } catch (error: any) {
          console.error('Error al crear el curso:', error);
          toast({
            title: "Error",
            description: error.response?.data?.message || "No se pudo crear el curso",
            variant: "destructive"
          });
        } finally {
          setIsLoading(false);
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
                                    name="gradeLevel"
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
                                                            {field.value ? field.value.name : "Selecciona un grado"}
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
                                                                {listGradeLevels.map((level) => (
                                                                    <div
                                                                        key={level.id}
                                                                        className={`p-1.5 cursor-pointer rounded hover:bg-gray-100 dark:hover:bg-zinc-800 text-sm flex items-center gap-1 ${field.value?.id === level.id ? 'bg-gray-100 dark:bg-zinc-800' : 'bg-transparent'}`}
                                                                        onClick={() => {
                                                                            field.onChange(level);
                                                                            setOpen(false);
                                                                        }}
                                                                    >
                                                                        {level.name}
                                                                        <Check
                                                                            className={cn(
                                                                                "ml-auto h-4 w-4",
                                                                                field.value?.id === level.id ? "opacity-100" : "opacity-0"
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
                            <div className="col-span-12 xl:col-span-5">
                                <FormField
                                    control={form.control}
                                    name="picture"
                                    render={({ field: { value, onChange, ...field } }) => (
                                        <FormItem>
                                            <FormLabel>Imagen</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            onChange(file);
                                                            setPreviewImage(URL.createObjectURL(file));
                                                        }
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="preview"
                                        className="w-full h-auto object-cover mt-2 rounded"
                                    />
                                ) : (
                                    <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center text-gray-500 mt-2 rounded">
                                        Vista previa
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Enviando..." : "Agregar curso"}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}

export default FormCourse;