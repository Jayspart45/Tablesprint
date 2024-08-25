import { toast } from "react-toastify";
import { Baseaxios } from "../config/config";

export const LoginApi = async (data: object): Promise<any> => {
    try {
        const response = await Baseaxios.post("/auth/login", data);
        return response.data;
    } catch (error: any) {
        console.error("Login error:", error);
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
    }
};
export const LogOutApi = async (): Promise<any> => {
    try {
        const response = await Baseaxios.post("/auth/logout");
        console.log(response.data);

        return response.data;
    } catch (error: any) {
        console.error("Logout error:", error);
        const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
        toast.error(errorMessage);
    }
};
