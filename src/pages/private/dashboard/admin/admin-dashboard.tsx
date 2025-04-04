import StatCard from "@/components/stat-card"
import { Button } from "@/components/ui/button"
import { BookOpenCheck, Download, Users, UserSquare } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
  { month: "July", desktop: 214, mobile: 140 },
  { month: "August", desktop: 214, mobile: 140 },
  { month: "September", desktop: 350, mobile: 140 },
  { month: "October", desktop: 154, mobile: 80 },
  { month: "November", desktop: 160, mobile: 140 },
  { month: "December", desktop: 114, mobile: 40 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig

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
  },
  {
    label: "Total quizez",
    number: 100,
    icon: UserSquare
  }
]

function AdminDashboard() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between pb-3">
        <h4 className="font-bold text-2xl">Dashboard</h4>
        <div>
          <Button><Download/> Descargar</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.map(({ label, number, icon }, index) => (
          <StatCard key={index} title={label} value={number} icon={icon} />
        ))}

      </div>

      <div >
        <Card>
          <CardHeader>
            <CardTitle>Alumnos</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[100px] max-h-[450px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

      </div>

    </div>
  )
}

export default AdminDashboard