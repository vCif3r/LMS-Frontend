import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    role: any;
};

const ListUsers = ({ data, loading, currentPage, setCurrentPage, totalPages }: any) => {
    const { toast } = useToast()
    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Nombre</TableHead>
                            <TableHead>Correo</TableHead>
                            <TableHead>Rol</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading == true ? (
                            <TableRow>
                                <TableCell className="text-center" colSpan={6}>
                                    
                                    Cargando...
                                </TableCell>
                            </TableRow>
                        ) : data.length > 0 ? (
                            data.map((user: User) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.firstName} {user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.role.name}</TableCell>
                                    <TableCell>
                                        <div>
                                            {user.isActive ? (
                                                <Badge variant="secondary">Activo</Badge>
                                            ) : (
                                                <Badge variant="destructive">Inactivo</Badge>
                                            )}
                                        </div>
                                    </TableCell>
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
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(user.id),
                                                            toast({
                                                                title: "ID copiado correctamente",
                                                                description: `ID del usuario: ${user.id}`,
                                                            })
                                                    }}
                                                >
                                                    Copy User ID
                                                </DropdownMenuItem>

                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem>View user</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell className="text-center" colSpan={6}>
                                    No hay resultados, error del servidor
                                </TableCell>
                            </TableRow>

                        )}
                    </TableBody>
                </Table>
            </div>

            {data.length > 0 && (
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev: any) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                        Anterior
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev: any) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                        Siguiente
                    </Button>
                </div>
            )}
        </>
    );
};

export default ListUsers;
