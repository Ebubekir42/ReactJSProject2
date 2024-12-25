import { Category } from "./category.model";

export interface Product{
    id: number;
    productname: string;
    unitprice: number;
    unitsinstock: number;
    categoryid: number;
}