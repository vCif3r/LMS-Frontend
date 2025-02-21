import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";

interface CourseProps{
    id?: number,
    title: string,
    description: string,
    imageUrl: string,
    status: string,
    teacher?: any,
}

export default function Dashboardcard(props: CourseProps) {
  return (
    <Card>
        <div className="p-2">
            <div className="relative">
                {props.status == "finished" && (
                    <div className="absolute inset-0 bg-gray-800 bg-opacity-60 flex items-center justify-center rounded-md">
                        <div className="text-center text-white text-xl font-bold">Finalizado</div>
                    </div>
                )}
                <img src={props.imageUrl} className="rounded-md h-40 w-full object-cover" />
            </div>
        </div>
        <div className="p-3 pt-0 space-y-3">
            <CardTitle>{props.title}</CardTitle>
            <div className="flex items-center">
                <img src="https://github.com/shadcn.png" alt="" className="h-8 rounded-full" />
                <div className="ml-2">
                    <p className="font-semibold text-sm">John Doe</p>
                    <p className="text-xs text-gray-500">jhon.doe@gmail.com</p>
                </div>
            </div>
            <Button className="w-full" variant={"outline"}>ingresar</Button>
        </div>
    </Card>
  )
}
