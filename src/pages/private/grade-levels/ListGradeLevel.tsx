import { GradeLevel } from '@/core/types/grade-level'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from 'react'
import { getGradeLevels, saveGradeLevel, softDeleteGradeLevel, updateGradeLevel } from '@/core/services/grade-level.service'
import { toast } from '@/hooks/use-toast'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/core/contexts/AuthProvider'
import { Loader2, PlusCircleIcon, Search } from 'lucide-react'
import CreateGradeLevel from './CreateGradeLevel'
import EditGradeLevel from './EditGradeLevel'
import DeleteGradeLevel from './DeleteGradeLevel'
import { Badge } from '@/components/ui/badge'

const ListGradeLevels: React.FC = () => {
  const { isAuthenticated } = useAuth()
  const role = 'admin'
  const [gradeLevels, setGradeLevels] = useState<GradeLevel[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // Estados para controlar los modales
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<GradeLevel | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await getGradeLevels();
      setGradeLevels(data.data);
      setError(null)
    } catch (error) {
      setError('Error al cargar los datos. Por favor, intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  const createItem = async (newGradeLevel: Omit<GradeLevel, 'id'>) => {
    try {
      setLoading(true);
      await saveGradeLevel(newGradeLevel);
      loadData();
      setIsCreateModalOpen(false);
      toast({
        title: 'Elemento creado',
        description: 'El grado ha sido creado exitosamente',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'No se pudo crear el grado',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (updatedItem: GradeLevel) => {
    try {
      setLoading(true);
      await updateGradeLevel(updatedItem);
      loadData();
      setIsUpdateModalOpen(false);
      toast({
        title: 'Elemento actualizado',
        description: 'El elemento ha sido actualizado exitosamente',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'No se pudo actualizar el elemento',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteItemHandler = async (id: number) => {
    try {
      setLoading(true);
      await softDeleteGradeLevel(id);
      loadData();
      setIsDeleteModalOpen(false);
      toast({
        title: 'Elemento eliminado',
        description: 'El elemento ha sido eliminado exitosamente',
      });
    } catch (err) {
      console.error('Error al eliminar el elemento:', err);
      toast({
        title: 'Error',
        description: 'No se pudo eliminar el elemento',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

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

            />
          </div>

        </div>
        {isAuthenticated && role === 'admin' && (
          <div className="flex items-center gap-2">
            <Button onClick={() => setIsCreateModalOpen(true)} disabled={loading}>
              {loading ? (
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
          {gradeLevels.length > 0 && (
            gradeLevels.map((gl: GradeLevel) => (
              <TableRow key={gl.id}>
                <TableCell>{gl.id}</TableCell>
                <TableCell>{gl.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="rounded-lg text-xs">
                    {gl.level === 'primaria' ? 'Primaria' : 'Secundaria'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" className="mr-2"
                    onClick={() => handleUpdateClick(gl)}
                    disabled={loading}>
                    Editar
                  </Button>
                  <Button variant="destructive"
                    onClick={() => handleDeleteClick(gl)}
                    disabled={loading}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
          {loading && (
            <TableRow>
              <TableCell colSpan={4}>
                <div className='flex justify-center items-center'>
                  <Loader2 className="mr-2 h-10 w-10 animate-spin" />
                  Cargando...
                </div>
              </TableCell>
            </TableRow>
          )}
          {error && (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-red-600">
                {error}
              </TableCell>
            </TableRow>
          )}
          {gradeLevels.length === 0 && !loading && !error && (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No hay datos disponibles
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

          <DeleteGradeLevel
            isOpen={isDeleteModalOpen}
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={() => deleteItemHandler(selectedItem.id)}
            item={selectedItem}
            isLoading={loading}
          />
        </>
      )}
    </>
  )
}

export default ListGradeLevels