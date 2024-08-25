import { toast } from "react-toastify";
import { Baseaxios } from "../config/config";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_SEARCH_TERM = "";
const DEFAULT_SORT_FIELD = "id";
const DEFAULT_SORT_ORDER: 'ASC' | 'DESC' = 'ASC';

export const getProductData = async (
    page: number = DEFAULT_PAGE,
    pageSize: number = DEFAULT_PAGE_SIZE,
    searchTerm: string = DEFAULT_SEARCH_TERM,
    sortField: string = DEFAULT_SORT_FIELD,
    sortOrder: 'ASC' | 'DESC' = DEFAULT_SORT_ORDER
): Promise<any> => {
    try {
        const response = await Baseaxios.get("/products/list_products", {
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
        console.error("Error fetching product data:", error);
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
        throw error;
    }
};

export const deleteProduct = async (id: number): Promise<void> => {
    try {
        await Baseaxios.delete(`/products/delete_product/${id}`);
        toast.success("Product deleted successfully.");
    } catch (error: any) {
        console.error("Error deleting product:", error);
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
        throw error;
    }
};

export const editProduct = async (id: number, data: FormData): Promise<void> => {
    try {
        await Baseaxios.put(`/products/update_product/${id}`, data);
        toast.success("Product updated successfully.");
    } catch (error: any) {
        console.error("Error updating product:", error);
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
        throw error;
    }
};
export const addProduct = async ( data: any): Promise<void> => {
    try {
        await Baseaxios.post(`/products/add_product`, data);
        toast.success("Product added successfully.");
    } catch (error: any) {
        console.error("Error updating product:", error);
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
        throw error;
    }
};
