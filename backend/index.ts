import express from "express";
import productRoutes from "./src/routes/product.routes";
import categoryRoutes from "./src/routes/category.routes";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
};
app.use(cors(corsOptions))
app.use(express.json());
app.use("/api/products",productRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});