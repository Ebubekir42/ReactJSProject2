import axios from "axios";

const API_URL = "http://localhost:5000/api/categories";

export interface Category {
    id: number;
    categoryName: string;
}

export const getCategories = async (): Promise<Category[]> => {
    try{
        const response = await axios.get<Category[]>(API_URL);
        return response.data;
    }
    catch(err){
        throw new Error(err instanceof Error ? err.message : "Hata category");
    }
    
}

export const getCategoryById = async (id: number): Promise<Category> => {
    const response = await axios.get<Category>(`${API_URL}/${id}`);
    return response.data;
}

