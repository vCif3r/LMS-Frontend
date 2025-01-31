import React from "react"

interface StatCardProps {
    label: string
    number: number
    icon: React.ElementType
}

function StatCard(props: StatCardProps) {
    return (
        <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-6 flex flex-row items-center justify-between pb-2 space-y-0">
                <div className="tracking-tight font-medium">{props.label}</div>
                <props.icon className="h-5 w-5 text-gray-500"/>
            </div>
            <div className="p-6 pt-0">
                <div className="text-3xl font-bold">+{props.number}</div>
            </div>
        </div>
    )
}

export default StatCard