import { Router } from "express";
import * as productController from "../controllers/product.controller";

const router = Router();

router.get("/", productController.getProducts);
router.post("/",productController.createProduct);
router.get("/:id",productController.getProduct);
router.delete("/:id",productController.deleteProduct);
router.put("/",productController.updateProduct);

export default router;