import { Card } from "@/components/ui/card"
import Layout from "@/core/layout/layout"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { DownloadIcon, PlusCircleIcon, UploadIcon } from "lucide-react";
import { useAuth } from "@/core/contexts/AuthProvider";
import ListCourses from "./list-courses/list-courses";

function Courses() {
  const { isAuthenticated } = useAuth()
  const role = 'admin'
  return (
    <Layout>
      <div className="p-5">
        <Card>
          <div className="p-4 space-y-4">
            <div className="flex justify-between items-center">
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
            </div>

            <div className="w-full flex justify-between items-center">
              <h1 className="text-xl font-semibold">Cursos</h1>

              {isAuthenticated && role == 'admin' && (
                <div className="flex items-center gap-2">
                  <Link to={'/courses/create'}><Button><PlusCircleIcon />Agregar</Button></Link>
                  <Button variant="outline"><UploadIcon /> Importar</Button>
                  <Button variant="outline"><DownloadIcon /> Exportar</Button>
                </div>
              )}

            </div>

            <ListCourses/>



          </div>
        </Card>
      </div>
    </Layout>

  )
}

export default Courses