
import axios from "axios";




const API_URL = "http://localhost:5000/api/products";



export interface Product {
    id: number;
    productname: string;
    categoryid: number;
    categoryName: string;
    unitprice: number;
    unitsinstock: number;
}

export const getProducts = async () : Promise<Product[]> => {
    const response = await axios.get<Product[]>(API_URL);
    return response.data;
}

export const createProduct = async (product: { productname: string, categoryid: number, unitprice: number }) => {
    const response = await axios.post(API_URL, product);
    return response.data;
}


export const deleteProduct = async (id: number) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
}

export const updateProduct = async (product: { id: number, productname: string, categoryid: number, unitprice: number }) => {
    const response = await axios.put(API_URL, product);
    return response.data;
}



