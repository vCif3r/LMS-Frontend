import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Loader } from "lucide-react"

interface StatCardProps {
    title: string
    value: number
    icon: React.ElementType,
    isLoading?: boolean
}

function StatCard(props: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-1">
                    <CardTitle className="text-sm font-medium">{props.title}</CardTitle>
                </div>
                <props.icon strokeWidth={2.5} className="h-4 w-4  text-muted-foreground"/>
            </CardHeader>
            <CardContent className="w-full">
                <div className="text-3xl font-bold">
                    {props.isLoading ? <Loader className="w-6 h-6 animate-spin" /> : props.value}
                </div>
            </CardContent>
        </Card>
    )
}

export default StatCard