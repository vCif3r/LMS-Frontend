import Layout from "@/core/layout/layout"
import AdminDashboard from "./admin/admin-dashboard"
import StudentDashboard from "./student/student-dashboard"
import TeacherDashboard from "./teacher/teacher-dashboard"
import { useAuth } from "@/core/contexts/AuthProvider"

function Dashboard() {
  const { userData, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Por favor, inicie sesión.</div>;
  }

  const role = userData?.role;

  const renderDashboard = () => {
    switch (role) {
      case 'admin':
      case 'superuser':
        return <AdminDashboard />;
      case 'estudiante':
        return <StudentDashboard />;
      case 'profesor':
        return <TeacherDashboard />;
      default:
        return <div className="p-4 text-center">Cargando...</div>;
    }
  };

  return (
    <Layout>
      {renderDashboard()}
    </Layout>
  );
}


export default Dashboard