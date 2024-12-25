import pool from "../utils/database";
import { Product } from "../models/product.model";

export const getAllProducts = async () : Promise<Product[]> => {
    // const result = await pool.query("SELECT * FROM product");
    const result = await pool.query('SELECT p.id, p.productname, p.unitprice, p.unitsinstock, c."categoryName", c.id as categoryid from product p inner join  category c on p.categoryid=c.id order by p.id');
    return result.rows;
};

export const createProduct = async (product: Product): Promise<Product> => {
    console.log("createProduct");
    const {productname, categoryid, unitprice} = product;
    console.log("Product" + productname + " " + " " + categoryid + " " + unitprice);
    //const categoryid = category.id;
    const result = await pool.query("INSERT INTO product (categoryid, productname, unitprice, unitsinstock) VALUES ($1, $2, $3, 1) RETURNING *", [categoryid, productname, unitprice]);
    console.log(result);
    return result.rows[0];
};

export const updateProduct = async (product: Product): Promise<Product> => {
    const {id, productname, categoryid, unitprice} = product;
    // const categoryid = category.id;
    const result = await pool.query("UPDATE product SET productname=$1, categoryid=$2, unitprice=$3 WHERE id=$4 RETURNING *", [productname, categoryid, unitprice, id]);
    console.log(result);
    return result.rows[0];
};

export const deleteProduct = async (id: number) : Promise<number | null> => {
    const result = await pool.query("DELETE FROM product WHERE id=$1", [id]);
    console.log(result);
    return result.rowCount;
};

export const getProductById = async (id: number): Promise<Product | null> => {
    const result = await pool.query("SELECT * FROM product WHERE id=$1", [id]);
    return result.rows[0];
};

