import { toast } from "react-toastify";
import { Baseaxios } from "../config/config";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SEARCH_TERM = "";
const DEFAULT_SORT_FIELD = "id";
const DEFAULT_SORT_ORDER: 'ASC' | 'DESC' = 'ASC';

export const getCategoryData = async (
    page: number = DEFAULT_PAGE,
    pageSize: number = DEFAULT_PAGE_SIZE,
    searchTerm: string = DEFAULT_SEARCH_TERM,
    sortField: string = DEFAULT_SORT_FIELD,
    sortOrder: 'ASC' | 'DESC' = DEFAULT_SORT_ORDER
): Promise<any> => {
    try {
        const response = await Baseaxios.get("/categories/list_categories", {
            params: {
                page,
                pageSize,
                searchTerm,
                sortField,
                sortOrder,
            }
        });
        return response.data.data;
    } catch (error: any) {
        console.error("Error fetching category data:", error);
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
        throw error;
    }
};

export const deleteCategory = async (id: number): Promise<void> => {
    try {
        await Baseaxios.delete(`/categories/delete_category/${id}`);
        toast.success("Category deleted successfully.");
    } catch (error: any) {
        console.error("Error deleting category:", error);
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
        throw error;
    }
};

export const editCategory = async (id: number, data: FormData): Promise<void> => {
    try {
        await Baseaxios.put(`/categories/update_category/${id}`, data);
        toast.success("Category updated successfully.");
    } catch (error: any) {
        console.error("Error updating category:", error);
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
        throw error;
    }
};
export const addCategory = async ( data: any): Promise<void> => {
    try {
        await Baseaxios.post(`/categories/add_category`, data);
        toast.success("Category added successfully.");
    } catch (error: any) {
        console.error("Error updating category:", error);
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
        throw error;
    }
};
