import { NextFunction, Request, Response } from "express";
import * as categoryService from "../services/category.service";
import { log } from "console";


export const getCategories =  async (req: Request, res: Response) => {
    try{
        const categories = await categoryService.getAllCategories();
        res.status(200).json(categories);
    }
    catch(error){
        const errorMessage = error instanceof Error? error.message : "An error occurred while fetching categories";
        res.status(500).json({error: errorMessage});
    }
};

export  const getCategoryById = async (req: Request, res: Response)  => {
    try{
        console.log("İd " + req.params.id);
        const category = await categoryService.getCategoryById(parseInt(req.params.id));
        if(!category){
            res.status(404).json({error: "Category not found"});
        }
        res.status(200).json(category);
    }
    catch(error){
        const errorMessage = error instanceof Error? error.message : "An error occurred while fetching category";
        res.status(500).json({error: errorMessage});
    }
}