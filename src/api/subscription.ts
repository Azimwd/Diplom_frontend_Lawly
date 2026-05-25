import api from "./axios";



export type PlanType = "1m" | "6m" | "1y";

export const createInvoice = async (plan: PlanType) => {
    try {
        const response = await api.post(`/subscription/create-invoice/`, {
            plan 
        });

        return response.data;
    } catch (error: any) {
        console.error("Ошибка при создании инвойса:", error);
        throw error; 
    }
};

export const invoiceUrl = async (invoiceId: number) => {
    try {
        const response = await api.post(`/payments/invoice/url/`, {
            invoiceId
        });

        return response.data;
    } catch (error: any) {
        console.error("Ошибка при получении URL инвойса:", error);
        throw error;
    }
};