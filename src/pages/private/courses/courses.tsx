import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DownloadIcon, PlusCircleIcon, UploadIcon } from "lucide-react";
import { useAuth } from "@/core/contexts/AuthProvider";
import ListCourses from "./list-courses/list-courses";
import { Input } from "@/components/ui/input";

function Courses() {
  const { isAuthenticated, userData } = useAuth()
  const role = userData?.role
  return (
    <div className="p-5 space-y-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={'/dashboard'}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cursos</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <CardTitle>Cursos</CardTitle>
          <CardDescription>Lista de cursos disponibles</CardDescription>
        </CardHeader>
        <CardContent>
          {isAuthenticated && role == 'admin' || role =='superuser' && (
            <div className="flex justify-between items-center gap-2 pb-2">
              <Input placeholder="Buscar curso" className="w-72" />
              <div className="flex gap-2">
                <Link to={'/courses/create'}><Button><PlusCircleIcon />Agregar</Button></Link>
                <Button variant="outline"><UploadIcon /> Importar</Button>
                <Button variant="outline"><DownloadIcon /> Exportar</Button>
              </div>
            </div>
          )}
          <ListCourses />
        </CardContent>
      </Card>
    </div>

  )
}

export default Courses