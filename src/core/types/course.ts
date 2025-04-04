import { GradeLevel } from "./grade-level"

export interface Course {
  id: number,
  name: string
  description: string
  gradeLevel: GradeLevel
  startDate: Date
  endDate: Date
  picture?: File
}