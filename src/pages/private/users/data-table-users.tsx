import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DownloadIcon, MoreHorizontal, PlusCircleIcon, Search, UploadIcon } from "lucide-react";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { UserFilters } from "@/core/types/user";
import { useUsers } from "@/hooks/use-users";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";

function DataTableUsers() {
    const [filters, setFilters] = useState<UserFilters>({
        page: 1,
        limit: 10,
        sortBy: 'createdAt',
        orderBy: 'DESC',
    })
    const { data, isLoading, isError } = useUsers(filters);
    const [searchTerm, setSearchTerm] = useState<string>('');
    // Actualizar paginacion
    const handlePageChange = (page: number) => {
        setFilters({ ...filters, page });
    };
    const navigate = useNavigate();
    return (
        <>
            <div className="w-full flex gap-3 justify-between items-center mb-4">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
                    <Input placeholder="buscar usuarios" className="w-[400px] pl-9"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setFilters({ ...filters, search: e.target.value, page: 1 });
                        }}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Link to={'/users/create'}><Button><PlusCircleIcon />Agregar</Button></Link>
                    <Button variant="outline"><UploadIcon /> Importar</Button>
                    <Button variant="outline"><DownloadIcon /> Exportar</Button>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Correo</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading == true && (
                            <TableRow>
                                <TableCell className="text-center" colSpan={6}>
                                    Cargando...
                                </TableCell>
                            </TableRow>
                        )}

                        {isError == true && (
                            <TableRow>
                                <TableCell className="text-center" colSpan={6}>
                                    Error al cargar los usuarios
                                </TableCell>
                            </TableRow>
                        )}

                        {data?.data?.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.firstName} {user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role.name}</TableCell>
                                <TableCell><Badge variant={user.isActive ? 'default' : 'destructive'}>{user.isActive ? 'Activo' : 'Inactivo'}</Badge></TableCell>
                                <TableCell className="text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" size="icon" className="w-8 h-8 p-0 rounded-full">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end" className="w-56">
                                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                            <DropdownMenuItem
                                            onClick={() => navigate(`/users/edit/${user.id}`)}>
                                                Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                Eliminar
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {data && data.meta.totalPages > 1 && (
                <Pagination className="w-full pt-2">
                    <PaginationContent>
                        {data.meta.hasPreviousPage && (
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(filters.page! - 1)}
                                />
                            </PaginationItem>
                        )}
                        {/* Mostrar hasta 5 páginas */}
                        {Array.from({ length: Math.min(5, data.meta.totalPages) }, (_, i) => {
                            const pageNumber = i + 1;
                            return (
                                <PaginationItem key={pageNumber}>
                                    <PaginationLink
                                        isActive={pageNumber === filters.page}
                                        onClick={() => handlePageChange(pageNumber)}
                                    >
                                        {pageNumber}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        })}
                        {/* Si hay más páginas que las mostradas */}
                        {data.meta.totalPages > 5 && (
                            <>
                                <PaginationItem>
                                    <span className="px-2">...</span>
                                </PaginationItem>
                                <PaginationItem>
                                    <PaginationLink
                                        onClick={() => handlePageChange(data.meta.totalPages)}
                                    >
                                        {data.meta.totalPages}
                                    </PaginationLink>
                                </PaginationItem>
                            </>
                        )}
                        {data.meta.hasNextPage && (
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(filters.page! + 1)}
                                />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            )}
        </>
    );
};

export default DataTableUsers;