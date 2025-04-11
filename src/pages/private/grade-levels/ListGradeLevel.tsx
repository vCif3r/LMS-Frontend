import { GradeLevel, GradeLevelFilters } from '@/core/types/grade-level'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/core/contexts/AuthProvider'
import { Loader2, PlusCircleIcon, Search } from 'lucide-react'
import CreateGradeLevel from './CreateGradeLevel'
import EditGradeLevel from './EditGradeLevel'
import DeleteGradeLevel from './DeleteGradeLevel'
import { Badge } from '@/components/ui/badge'
import { useCreateGradeLevel, useGradeLevels, useUpdateGradeLevel } from '@/hooks/use-grade-level'
import { Skeleton } from '@/components/ui/skeleton'
import { set } from 'date-fns'

const ListGradeLevels: React.FC = () => {
  const { isAuthenticated, role } = useAuth()
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado de carga para el botón
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('')

  const createGradeLevel = useCreateGradeLevel();
  const updateGradeLevel = useUpdateGradeLevel(); // Cambia esto a la mutación de actualización correspondiente

  // Custom hook para obtener los niveles de grado
  const [filters, setFilters] = useState<GradeLevelFilters>({
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    orderBy: 'DESC',
  })

  const { data, isLoading, isError } = useGradeLevels(filters);

  const handlePageChange = (page: number) => {
    setFilters({ ...filters, page });
  };

  // Estados para controlar los modales
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GradeLevel | null>(null);

  useEffect(() => {
  }, [])

  const createItem = async (newGradeLevel: Omit<GradeLevel, 'id'>) => {
    try {
      setLoading(true);
      await createGradeLevel.mutateAsync(newGradeLevel)
      setIsCreateModalOpen(false)
    } catch (error) {
      console.error('Error al crear el grado:', error)
    }finally {
      setLoading(false); // Detener carga
    }
  }

  const updateItem = async (updatedItem: GradeLevel) => {
    try {
      setLoading(true);
      await updateGradeLevel.mutateAsync(updatedItem);
      setIsUpdateModalOpen(false)
    } catch (error) {
      console.error('Error al actualizar el grado:', error)
    } finally {
      setLoading(false); // Detener carga
    }
  }


  // const updateItem = async (updatedItem: GradeLevel) => {
  //   try {
  //     setLoading(true);
  //     await updateGradeLevel(updatedItem);
  //     loadData();
  //     setIsUpdateModalOpen(false);
  //     toast({
  //       title: 'Elemento actualizado',
  //       description: 'El elemento ha sido actualizado exitosamente',
  //     });
  //   } catch (err) {
  //     toast({
  //       title: 'Error',
  //       description: 'No se pudo actualizar el elemento',
  //       variant: 'destructive',
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const deleteItemHandler = async (id: number) => {
  //   try {
  //     setLoading(true);
  //     await softDeleteGradeLevel(id);
  //     loadData();
  //     setIsDeleteModalOpen(false);
  //     toast({
  //       title: 'Elemento eliminado',
  //       description: 'El elemento ha sido eliminado exitosamente',
  //     });
  //   } catch (err) {
  //     console.error('Error al eliminar el elemento:', err);
  //     toast({
  //       title: 'Error',
  //       description: 'No se pudo eliminar el elemento',
  //       variant: 'destructive',
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleUpdateClick = (item: GradeLevel) => {
    setSelectedItem(item);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteClick = (item: GradeLevel) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className="flex pb-3 justify-between items-center">
        <div className='flex items-center gap-2'>

          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input placeholder="buscar grado" className="w-[400px] pl-9"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setFilters({ ...filters, name: e.target.value, page: 1 });
              }}
            />
          </div>

        </div>
        {isAuthenticated && (role === 'superuser' || role === 'admin') && (
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsCreateModalOpen(true)} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Cargando
                </>
              ) : (
                <>
                  <PlusCircleIcon className="mr-2 h-4 w-4" />
                  <span>Agregar</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Nivel</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((gradeLevel) => (
            <TableRow key={gradeLevel.id}>
              <TableCell>{gradeLevel.id}</TableCell>
              <TableCell>{gradeLevel.name}</TableCell>
              <TableCell><Badge variant={gradeLevel.level ? 'default' : 'destructive'}>{gradeLevel.level}</Badge></TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2"
                  onClick={() => handleUpdateClick(gradeLevel)}
                >
                  Editar
                </Button>
                <Button variant="destructive"
                  onClick={() => handleDeleteClick(gradeLevel)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}


          {isLoading && (
            <TableRow>
              <TableCell colSpan={4}>
                <div className="space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </TableCell>
            </TableRow>
          )}
          {isError && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-red-600">
                {error}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <CreateGradeLevel
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={createItem}
        isLoading={loading}
      />

      {selectedItem && (
        <>
          <EditGradeLevel
            isOpen={isUpdateModalOpen}
            onClose={() => setIsUpdateModalOpen(false)}
            onUpdate={updateItem}
            item={selectedItem}
            isLoading={loading}
          />

          {/* <DeleteGradeLevel
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={() => deleteItemHandler(selectedItem.id)}
            item={selectedItem}
            isLoading={loading}
          />  */}
        </>
      )}
    </>
  )
}

export default ListGradeLevels