import { Category } from "../models/category.model";
import pool from "../utils/database"


export const getAllCategories = async (): Promise<Category[]> => {
    const result = await pool.query("SELECT * FROM category");
    return result.rows;
}

export const getCategoryById = async (id:number) : Promise<Category | null>  => {
    console.log("Service id: " + id);
    const result = await pool.query("SELECT * FROM category WHERE id = $1",[id]);
    console.log("Service result: " + JSON.stringify(result.rows));
    return result.rows[0] || null;
}