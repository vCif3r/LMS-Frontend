import Layout from "@/core/layout/layout"
import AdminDashboard from "./admin/admin-dashboard"
import StudentDashboard from "./student/student-dashboard"
import TeacherDashboard from "./teacher/teacher-dashboard"

function Dashboard() {
  const role: string = "student"
  const renderDashboard = () => {
    switch (role) {
      case 'admin':
        return <AdminDashboard/>
      case 'student':
        return <StudentDashboard/>
      case 'teacher':
        return <TeacherDashboard/>
      default:
        return <div className="p-4 text-center">Cargando...</div>;
    }
  }

  return (
    <>
      <Layout>
        {renderDashboard()}
      </Layout>
    </>
  )
}

export default Dashboard