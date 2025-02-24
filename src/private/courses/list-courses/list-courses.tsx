import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { getCourses } from '@/core/services/course.service';

type Course = {
    id: string
    title: string
    gradeLevel: string
    level: string
}

function ListCourses() {
    const [courses, setCourses] = useState<Course[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true); // Iniciamos la carga
                const data = await getCourses(); // Usamos el servicio
                setCourses(data); // Guardamos los cursos en el estado
            } catch (err) {
                setError('Hubo un error al cargar los cursos');
            } finally {
                setLoading(false); // Al finalizar, dejamos de cargar
            }
        };
        fetchCourses(); // Llamar a la función para obtener los cursos
    }, []);
    
    return (
        <div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Título</TableHead>
                        <TableHead>Grado</TableHead>
                        <TableCell>Nivel</TableCell>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading &&
                        <TableRow>
                            <TableCell className="text-center" colSpan={5}>
                                Cargando...
                            </TableCell>
                        </TableRow>}
                    {error &&
                        <TableRow>
                            <TableCell className="text-center" colSpan={5}>
                                {error}
                            </TableCell>
                        </TableRow>
                    }
                    {courses && !loading && !error && (
                        courses.map((course) => (
                            <TableRow key={course.id}>
                                <TableCell>{course.id}</TableCell>
                                <TableCell>{course.title}</TableCell>
                                <TableCell>{course.gradeLevel}</TableCell>
                                <TableCell>{course.level}</TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <span className="sr-only">Open menu</span>
                                                <MoreHorizontal />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>View Curso</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))
                    )}               
                </TableBody>
            </Table>
        </div>
    )
}

export default ListCourses