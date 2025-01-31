import StatCard from "@/components/stat-card"
import { Button } from "@/components/ui/button"
import { BookOpenCheck, Users, UserSquare } from "lucide-react"

const data = [
  {
    label: "Total alumnos",
    number: 500,
    icon: Users
  },
  {
    label: "Total cursos",
    number: 600,
    icon: BookOpenCheck
  },
  {
    label: "Total profesores",
    number: 100,
    icon: UserSquare
  }
]

function Dashboard() {
  return (
    <div className="p-4">
      <div className="flex justify-between pb-3">
        <h4 className="font-bold text-2xl">Dashboard</h4>
        <div>
          <Button>Descargar</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.map(({ label, number, icon }, index) => (
          <StatCard key={index} label={label} number={number} icon={icon} />
        ))}
        
      </div>
      
    </div>
  )
}

export default Dashboard