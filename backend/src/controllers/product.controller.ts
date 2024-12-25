import { Request, Response } from "express";
import * as productService from "../services/product.service";
import { Product } from "../models/product.model";

export const getProducts = async (req: Request, res: Response) => {
    try{
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    }catch(error){
        // const errorMessage = error instanceof Error? error.message : "An error occurred while fetching products";
        // res.status(500).json({message: errorMessage});
        res.status(500).json();
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try{
        const product = await productService.createProduct(req.body);
        res.status(201).json(product);
    }
    catch(error){
        // const errorMessage = error instanceof Error ? error.message : "An error occurred while creating";
        // res.status(500).json({error: errorMessage});
        res.status(500).json();
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    // try{
    //     const product = await productService.getProductById(parseInt(req.params.id));
    //     if(!product){
    //         // res.status(404).json({message: "Product not found"});
    //         res.status(404).json();
    //     }
    //     else{
    //         await productService.deleteProduct(parseInt(req.params.id,10));
    //         res.status(204).json();
    //     }
    // }
    try{
        const deleteProduct = await productService.deleteProduct(parseInt(req.params.id,10));
        if(deleteProduct && deleteProduct > 0){
            res.status(204).json();
        }
        else{
            res.status(404).json();
        }
        
        
    }
    catch(error){
        // const errorMessage = error instanceof Error? error.message : "An error occurred while deleting product";
        // res.status(500).json({message: errorMessage});
        res.status(500).json();
    }
}

export const getProduct = async (req: Request, res: Response) : Promise<void> => {
    try{
        const product = await productService.getProductById(parseInt(req.params.id));
        if(!product){
            // res.status(404).json({message: "Product not found"});
            res.status(404).json();
        }
        else{
            res.status(200).json(product);
        }
        
        
        
    }catch(error){
        // const errorMessage = error instanceof Error? error.message : "An error occurred while fetching product";
        // res.status(500).json("HATAAAA");
        res.status(500).json();
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try{
        const updatedProduct = await productService.updateProduct(req.body);
        if(!updatedProduct){
            // res.status(404).json({message: "Product not found"});
            res.status(404).json();
        }
        else{
            res.status(201).json(updatedProduct);
        }
        
    }
    catch(error){
        // const errorMessage = error instanceof Error? error.message : "An error occurred while updating product";
        // res.status(500).json({error: errorMessage});
        res.status(500).json();
    }
}

