import { toast } from "react-toastify";
import { Baseaxios } from "../config/config";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SEARCH_TERM = "";
const DEFAULT_SORT_FIELD = "id";
const DEFAULT_SORT_ORDER: 'ASC' | 'DESC' = 'ASC';

export const getSubCategoryData = async (
    page: number = DEFAULT_PAGE,
    pageSize: number = DEFAULT_PAGE_SIZE,
    searchTerm: string = DEFAULT_SEARCH_TERM,
    sortField: string = DEFAULT_SORT_FIELD,
    sortOrder: 'ASC' | 'DESC' = DEFAULT_SORT_ORDER
): Promise<any> => {
    try {
        const response = await Baseaxios.get("/subcategories/list_subcategories", {
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
        console.error("Error fetching subcategory data:", error);
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
        throw error;
    }
};

export const deleteSubCategory = async (id: number): Promise<void> => {
    try {
        await Baseaxios.delete(`/subcategories/delete_subcategory/${id}`);
        toast.success("SubCategory deleted successfully.");
    } catch (error: any) {
        console.error("Error deleting subcategory:", error);
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
        throw error;
    }
};

export const editSubCategory = async (id: number, data: FormData): Promise<void> => {
    try {
        await Baseaxios.put(`/subcategories/update_subcategory/${id}`, data);
        toast.success("SubCategory updated successfully.");
    } catch (error: any) {
        console.error("Error updating subcategory:", error);
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
        throw error;
    }
};
export const addSubCategory = async ( data: any): Promise<void> => {
    try {
        await Baseaxios.post(`/subcategories/add_subcategory`, data);
        toast.success("SubCategory added successfully.");
    } catch (error: any) {
        console.error("Error updating subcategory:", error);
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
        throw error;
    }
};
