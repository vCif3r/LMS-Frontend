import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Layout from "@/core/layout/layout"
import { Link, NavLink } from "react-router-dom"
import FormCourse from "./form-course"

function AddCourse() {
    return (
        <Layout>
            <div className="p-5">
                <div className="flex py-2">
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <Link to="/">Home</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <Link to="/courses">Cursos</Link>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Agregar</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                {/* formulario */}
                <FormCourse />
            </div>
        </Layout>
    )
}

export default AddCourse