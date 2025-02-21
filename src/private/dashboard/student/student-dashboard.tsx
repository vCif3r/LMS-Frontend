import Dashboardcard from "@/core/components/dashboard-card/dashboard-card"

function StudentDashboard() {
  return (
    <div className="p-5 space-y-3">
      <div className="space-y-1">
        <h4 className="font-bold text-2xl">Dashboard</h4>
        <p className="text-gray-500">Cursos inscritos</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Dashboardcard title="Matemática" description="descripcion de ejemplo" imageUrl="https://navarra.profeharol.com/pluginfile.php/2627/course/section/106/Portada_Mate.jpg" status="active" />
        <Dashboardcard title="Ingles Nivel A1" description="descripcion de ejemplo" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlJT1snm5yx_u-joi6m_7SSp_iHEyoXcQcNQ&s" status="finished" />
        <Dashboardcard title="Matemática" description="descripcion de ejemplo" imageUrl="https://github.com/shadcn.png" status="active" />
        <Dashboardcard title="Matemática" description="descripcion de ejemplo" imageUrl="https://github.com/shadcn.png" status="finished"/>
        <Dashboardcard title="Matemática" description="descripcion de ejemplo" imageUrl="https://github.com/shadcn.png" status="active" />
        <Dashboardcard title="Matemática" description="descripcion de ejemplo" imageUrl="https://github.com/shadcn.png" status="active" />
      </div>
    </div>
  )
}
export default StudentDashboard