import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ListGradeLevels from './ListGradeLevel';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
const GradeLevelPage = () => {
  return (
    <div className="p-5 space-y-3">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={'/dashboard'}>Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Grados</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card>
        <CardHeader>
          <CardTitle>Grados</CardTitle>
          <CardDescription>Lista de todos lo grados en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <ListGradeLevels />
        </CardContent>
      </Card>
    </div>
  )
}

export default GradeLevelPage