export interface Pagination {
    page: number;
    limit: number;
    orderBy?: string;
    order?: 'ASC' | 'DESC';
}

export interface PaginatedResponse<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}