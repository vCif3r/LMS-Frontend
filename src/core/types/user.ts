export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isActive: boolean;
    role: any;
};

export interface UserFilters {
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    orderBy?: 'ASC' | 'DESC';
}