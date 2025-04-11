import { CourseFilters } from '@/core/types/course';
import { useCourses } from '@/hooks/use-courses'
import React, { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { DownloadIcon, MoreHorizontal, PlusCircleIcon, Search, UploadIcon } from 'lucide-react';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { useAuth } from '@/core/contexts/AuthProvider';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';

export const DataTableCourses: React.FC = () => {
    const navigate = useNavigate()
    const { isAuthenticated, role } = useAuth()
    const [filters, setFilters] = useState<CourseFilters>({
        page: 1,
        limit: 10,
        orderBy: 'createdAt',
        order: 'DESC'
    })
    const { data, isLoading, isError } = useCourses(filters);

    return (
        <>
            {isAuthenticated && role == 'admin' || role == 'superuser' && (
                <div className="flex justify-between items-center gap-2 pb-3">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                        <Input placeholder="Buscar curso" className="w-[400px] pl-9" onChange={(e) => {
                            setFilters({ ...filters, name: e.target.value, page: 1 })
                        }} />
                    </div>

                    <div className="flex gap-2">
                        <Link to={'/courses/create'}><Button><PlusCircleIcon />Agregar</Button></Link>
                        <Button variant="outline"><UploadIcon /> Importar</Button>
                        <Button variant="outline"><DownloadIcon /> Exportar</Button>
                    </div>
                </div>
            )}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Título</TableHead>
                        <TableHead>Grado</TableHead>
                        <TableCell>Nivel</TableCell>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading &&
                        <TableRow>
                            <TableCell className="text-center" colSpan={5}>
                                Cargando...
                            </TableCell>
                        </TableRow>
                    }
                    {isError &&
                        <TableRow>
                            <TableCell className="text-center" colSpan={5}>
                                intenta más tarde
                            </TableCell>
                        </TableRow>
                    }
                    {data?.data.map((course) => (
                        <TableRow key={course.id}>
                            <TableCell>{course.name}</TableCell>
                            <TableCell>{course.gradeLevel?.name}</TableCell>
                            <TableCell>{course.gradeLevel?.level}</TableCell>
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
                                        <DropdownMenuItem onClick={() => 
                                            navigate(`/courses/${course.id}`)
                                        }>View Curso</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    )
}

