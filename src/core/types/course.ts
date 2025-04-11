import { GradeLevel } from "./grade-level"

export interface Course {
  id: string,
  name: string
  description: string
  gradeLevel: GradeLevel
  startDate: Date
  endDate: Date
  imageUrl?: string
  createdAt: Date
  updateAt: Date
  deletedAt: Date
}

export interface CourseFilters {
  page?: number,
  limit?: number,
  orderBy?: string,
  order?: string
  name?: string
}

export interface CreateCourse{
  name: string
  description: string
  gradeLevelId: string
  startDate: Date
  endDate: Date
}