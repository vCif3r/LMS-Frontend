
import { DatePicker } from "@/components/date-picker"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
function FormCourse() {
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [picture, setPicture] = useState<string>()
    // const dateTimeLocalNow = new Date(
    //     new Date().getTime() - new Date().getTimezoneOffset() * 60_000
    // ).toISOString().slice(0, 16)

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Agregar nuevo curso</CardTitle>
                    <CardDescription>Completa todos los campos del formulario.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-12 xl:col-span-7 space-y-4">
                            <div>
                                <Label htmlFor="nombre">Nombre</Label>
                                <Input type="text" id="nombre" name="nombre" />
                            </div>
                            <div>
                                <Label htmlFor="title">Descripción</Label>
                                <Textarea></Textarea>
                            </div>
                            <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
                                <div>
                                    <Label>Fecha inicio</Label>
                                    <DatePicker date={startDate} setDate={setStartDate} />
                                </div>
                                <div>
                                    <Label>Fecha fin</Label>
                                    <DatePicker date={endDate} setDate={setEndDate} />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 xl:col-span-5">
                            <div className="">
                                <Label htmlFor="picture">Picture</Label>
                                <Input id="picture" type="file" onChange={(e)=> {
                                    const file = e.target.files?.[0]
                                    setPicture(file ? URL.
                                        createObjectURL(file) : undefined)   
                                }} 
                                />
                                { picture ? (
                                    <img src={picture} alt="preview" className="w-full h-48 object-cover" />
                                ): (
                                    <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                                        <span className="text-gray-500">Preview</span>
                                        
                                    
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit">Agregar curso</Button>
                </CardFooter>
            </Card>
        </>
    )
}

export default FormCourse