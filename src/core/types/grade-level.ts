export interface GradeLevel {
  id: string,
  name: string
  description: string
  level: string
  createdAt?: Date
  updateAt?: Date
}

export interface GradeLevelFilters {
  page?: number
  limit?: number
  sortBy?: string
  orderBy?: 'ASC' | 'DESC'
  level?: string
  name?: string
}