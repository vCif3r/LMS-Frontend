import { useState, useEffect } from "react";
import axios from "axios";
import ListUsers, { User } from "./list-users/list-users";
import { PlusCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/core/layout/layout";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const Users = () => {
  const [data, setData] = useState<User[]>([]); // Estado para la lista de usuarios
  const [totalCount, setTotalCount] = useState(0); // Total de usuarios
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [perPage, setPerPage] = useState(20); // Usuarios por página
  const [loading, setLoading] = useState<boolean>(true)
  // Función para obtener los datos de usuarios desde la API
  const getlistUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/users?page=${currentPage}&perPage=${perPage}`
      );
      const result = response.data;
      setData(result.data); // Actualizamos los usuarios en el estado
      setTotalCount(result.total); // Actualizamos el total de usuarios

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false)
    }
  };

  // Llamar a la función fetchData cuando la página actual
  useEffect(() => {
    getlistUser();
  }, [currentPage, perPage]);
  // Calcular el total de páginas
  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <Layout>
      <div className="p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Usuarios</h1>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={'/dashboard'}>Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Usuarios</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="w-full flex justify-end ">
          <Link to={'/users/create'}><Button><PlusCircleIcon />Agregar</Button></Link>
        </div>

        <ListUsers
          data={data}
          loading={loading} // Puedes implementar un estado de carga si lo necesitas
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </Layout>
  );
};

export default Users;
