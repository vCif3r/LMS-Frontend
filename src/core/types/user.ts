export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    dni: string;
    isActive: boolean;
    role: any;
    roleId?: number;
    createdAt: Date;
    updatedAt: Date;
};

export interface UserFilters {
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    orderBy?: 'ASC' | 'DESC';
}