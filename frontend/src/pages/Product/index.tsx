import React, { ChangeEvent, Children, useEffect, useState } from "react";
import * as productService from "../../services/product.service";
import * as categoryService from "../../services/category.service";
import { useLocation } from "react-router-dom";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Link, Typography } from "@mui/material";
import 'bootstrap/dist/css/bootstrap.css';
import '../../../src/App.css';
import { DataGrid } from "@mui/x-data-grid";
import DataTable from "../../components/DataGrid";
import Resized from "../../components/Resized";
import Resized2 from "../../components/Resized2";
import Resized3 from "../../components/Resized3";

interface Category {
  id: number;
  categoryName: string;
}

interface Product {
  id: number;
  productname: string;
  categoryid: number;
  categoryName: string;
  unitprice: number;
  unitsinstock: number;
}
interface ProductForAdd{
  productname: string;
  categoryid: number;
  unitprice: number;
}

const Product: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const [openDialogs, setOpenDialogs] = useState<{ id: number, message: string }[]>([]);
  // const [errors, setErrors] = useState<string>

  const location = useLocation();
  const [errorForProduct, setErrorForProduct] = useState<string | null>(null);
  const [errorForCategory, setErrorForCategory] = useState<string | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [addProduct, setAddProduct] = useState<ProductForAdd>({ productname: '', categoryid: 0,unitprice: 0});
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [filtreProducts, setFiltreProducts] = useState<Product[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [openForAddProduct, setOpenForAddProduct] = useState<boolean>(false)
  // const [open2, setOpen2] = useState<boolean>(false);
  const [isLoadingForProduct, setIsLoadingForProduct] = useState<boolean>(true);
  const [isLoadingForCategory, setIsLoadingForCategory] = useState<boolean>(true);

  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");
  const [searhTerm, setSearhTerm] = useState<string>("");

  const handleCloseForEditProduct = () => {
    setOpen(false);
  }
  
  const handleCloseForAddProduct = () => {
    setOpenForAddProduct(false);
  }

  const handleChangeAddProduct = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (addProduct) {
      setAddProduct({ ...addProduct, [name]: value });
    }
  }

  const handleSubmitAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    let message = "";
    console.log(addProduct);
    try {
      await productService.createProduct(addProduct);
      setOpenForAddProduct(false);
      fetchProducts();
      message = "Ürün başarıyla eklendi";
      setAddProduct({ productname: '', categoryid: 0, unitprice: 0});
    }
    catch (error) {
      if (error instanceof Error) {
        // setErrorForProduct("Ürün eklerken bir hata oluştu: " + error.message);
        message = "Ürün eklerken bir hata oluştu: " + error.message;  
        setOpenForAddProduct(false);
      }
    }
    const newDialog = {id: Date.now(), message: message};
    setOpenDialogs(prevDialogs => [...prevDialogs, newDialog]);
    setTimeout(() => {
      setOpenDialogs(prevDialogs => prevDialogs.filter(dialog => dialog.id!== newDialog.id));
    }, 5000);
  }

  const fetchProducts = async () => {
    try {
      console.log("fetch Products iç");
      const data = await productService.getProducts();
      setProducts(data);
      setFiltreProducts(data);
    }
    catch (error) {
      if (error instanceof Error) {
        setErrorForProduct("Ürün listelerken bir hata oluştu: " + error.message);
      }
    }
    finally {
      setIsLoadingForProduct(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getCategories();
      setCategories(data);
    }
    catch (error) {
      if (error instanceof Error) {
        setErrorForCategory("Kategori listelerken bir hata oluştu: " + error.message);
      }
    }
    finally {
      setIsLoadingForCategory(false);
    }
  }

  const openDialog = (product: Product) => {
    setEditProduct(product);
    setOpen(true);
    // console.log("Bilgi: " + editProduct.id + " " + editProduct.productname + " " + editProduct.unitprice);
    console.log(editProduct);
  }

 

  const deleteProduct = async (product: Product) => {
    let message = "";
    try {
      await productService.deleteProduct(product.id);
      message = "Ürün başarıyla silindi";
      fetchProducts();
      setOpen(false);
    } catch (error) {
      if(error instanceof Error){
        message = "Ürün silinirken bir hata oluştu: " + error.message;
        setOpen(false);
      }
    }
    const newDialog = {id: Date.now(), message: message};
    setOpenDialogs(prevDialogs => [...prevDialogs, newDialog]);
    setTimeout(() => {
      setOpenDialogs(prevDialogs => prevDialogs.filter(dialog => dialog.id!== newDialog.id));
    }, 5000);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (editProduct) {
      setEditProduct({ ...editProduct, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let message = "";
    try {
      if(editProduct){
        await productService.updateProduct(editProduct);
        setOpen(false);
        fetchProducts();
        message = "Ürün başarıyla güncellendi";
      }
    }
    catch (error) {
      if(error instanceof Error){
        setOpen(false);
        message = "Ürün güncellerken bir hata oluştu: " + error.message;
      }
    }
    const newDialog = {id: Date.now(), message: message};
    setOpenDialogs(prevDialogs => [...prevDialogs, newDialog]);
    setTimeout(() => {
      setOpenDialogs(prevDialogs => prevDialogs.filter(dialog => dialog.id!== newDialog.id));
    }, 5000);

  };

  // const updateProductByCategoryId = (e: ChangeEvent<HTMLSelectElement>) => {
  //   const { name, value } = e.target;
  //   if (value === "") {
  //     setFiltreProducts(products);
  //   }
  //   else {
  //     const filtreproducts = products.filter(product => product.categoryid === parseInt(value));
  //     setFiltreProducts(filtreproducts);
  //   }


  // }



  // const searchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   const filtreProducts = products.filter(product => product.productname.toLowerCase().includes(value.toLowerCase()));
  //   setFiltreProducts(filtreProducts);
  // }


  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    let updateProducts = products;
    if(selectedCategory !== "all"){
      updateProducts = updateProducts.filter((product) => product.categoryid ===  selectedCategory);
    }

    if(searhTerm.trim() !== ""){
      updateProducts = updateProducts.filter((product) => product.productname.toLowerCase().includes(searhTerm.toLowerCase()));
    }

    setFiltreProducts(updateProducts);
  },[products, searhTerm, selectedCategory]);

  


  return (
    <div>
          <div className="container-xl my-4 border border-light-subtle p-4">
            <div className="row">
              <div className="col-3">
                <div>
                  <div className="mb-4">

                    <h4 className="fs-3 fw-semibold" style={{ color: "orange" }}>Filter</h4>

                    <div>
                      <h6 className="fs-5 fw-semibold" style={{ color: "black" }}>Category</h6>
                      <div>
                        {
                          isLoadingForCategory ? <div className="text-center mt-4"><CircularProgress/></div> : 
                          errorForCategory != null ? <div className="text-danger">{errorForCategory}</div> :
                          categories.length == 0 ? <div>Kategori listesi boş</div> :
                          <select onChange={(e) => setSelectedCategory(e.target.value === "all" ? "all" : Number(e.target.value))} className="form-select" name="categoryid" >
                          <option value="all" >All</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.categoryName}</option>
                          ))}
                        </select>
                        }
                        
                      </div>
                      <div className="mt-4">
                        <h6 className="fs-5 fw-semibold">Search</h6>
                        <input type="text" placeholder="Enter the product name..." className="form-control" onChange={(e) => setSearhTerm(e.target.value)} />
                      </div>
                    </div>
                    <div className="mt-4">
                      {/* <button onClick={() => {
                        // const product = {id: 140,
                        //   productname: "dsa",
                        //   categoryid: 2,
                        //   categoryName: "string",
                        //   unitprice: 2,
                        //   unitsinstock: 1};
                        // delProduct(product);
                        getProductById(140);
                      }} className="btn btn-primary">Kaydet</button> */}
                     
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-9">
                <div className="">
                  {
                    openDialogs.map((dialog, index) => (
                      <Dialog style={{ bottom: "auto", left: "auto", top: `${index * 20 + 5}%` }}
                        open={true} // Dialog'un açılıp kapanma durumu
                        onClose={() =>
                          setOpenDialogs(prevDialogs => prevDialogs.filter(d => d.id !== dialog.id))
                        } // Dialog kapanma işlevi
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        id="dialog1"
                        key={dialog.id}
                      >
                        {/* <DialogTitle id="alert-dialog-title">{"Dialog Title"}</DialogTitle> */}
                        <DialogContent>
                          <Typography variant="body1">
                            {dialog.message}
                          </Typography>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={() => setOpenDialogs(prevDialogs => prevDialogs.filter(d => d.id !== dialog.id))} color="primary">
                            Close
                          </Button>
                        </DialogActions>
                      </Dialog>
                    ))}


                  {
                    editProduct && <Dialog
                      open={open} // Dialog'un açılıp kapanma durumu
                      onClose={handleCloseForEditProduct} // Dialog kapanma işlevi
                      aria-labelledby="alert-dialog-title2"
                      aria-describedby="alert-dialog-description2"
                    >
                      <DialogTitle id="alert-dialog-title2">Edit Product</DialogTitle>
                      <DialogContent>
                        {/* <Typography variant="body1">
                              {message}
                          </Typography> */}
                        <div>
                          <form onSubmit={handleSubmit}>
                            <div className="mt-3">
                              <label htmlFor="productname" className="form-label">Product Name</label>
                              <input onChange={handleChange} type="text" className="form-control" id="productname" name="productname" value={editProduct.productname} placeholder="Enter product name..." />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="unitprice" className="form-label">Unit Price</label>
                              <input onChange={handleChange} type="text" className="form-control" id="unitprice" name="unitprice" value={editProduct.unitprice} placeholder="Enter unit price..." />
                            </div>
                            <div className="mb-3">
                              <div className="mb-2">
                                <span className="text-dark fs-6">Category Name</span>
                              </div>

                              <select onChange={handleChange} name="categoryid" className="form-select" >
                                <option value="" disabled>Select a category</option>
                                {

                                  categories.map(category => {
                                    return <option key={category.id} value={category.id} selected={editProduct.categoryid == category.id} >{category.categoryName}</option>
                                  })
                                }

                              </select>
                              <div>

                              </div>
                            </div>

                          </form>
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseForEditProduct} color="secondary" className="btn btn-secondary bg-seccondary">
                          Close
                        </Button>
                        <Button onClick={handleSubmit} color="primary" className="btn btn-primary " >Edit</Button>
                      </DialogActions>
                    </Dialog>
                  }
                  {
                    <Dialog
                      open={openForAddProduct} // Dialog'un açılıp kapanma durumu
                      onClose={handleCloseForAddProduct} // Dialog kapanma işlevi
                      aria-labelledby="alert-dialog-title2"
                      aria-describedby="alert-dialog-description2"
                    >
                      <DialogTitle id="alert-dialog-title2">Add Product</DialogTitle>
                      <DialogContent>
                        {/* <Typography variant="body1">
                              {message}
                          </Typography> */}
                        <div>
                          <form onSubmit={handleSubmitAddProduct}>
                            <div className="mt-3">
                              <label htmlFor="productname" className="form-label">Product Name</label>
                              <input onChange={handleChangeAddProduct} type="text" className="form-control" id="productname" name="productname" value={addProduct.productname} placeholder="Enter product name..." />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="unitprice" className="form-label">Unit Price</label>
                              <input onChange={handleChangeAddProduct} type="text" className="form-control" id="unitprice" name="unitprice" value={addProduct.unitprice === 0 ? "" : addProduct.unitprice} placeholder="Enter unit price..." />
                            </div>
                            <div className="mb-3">
                              <div className="mb-2">
                                <span className="text-dark fs-6">Category Name</span>
                              </div>

                              <select onChange={handleChangeAddProduct} name="categoryid" className="form-select" >
                                <option value="">Select a category</option>
                                {

                                  categories.map(category => {
                                    return <option key={category.id} value={category.id} selected={addProduct.categoryid == category.id} >{category.categoryName}</option>
                                  })
                                }

                              </select>
                              <div>

                              </div>
                            </div>

                          </form>
                        </div>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={handleCloseForAddProduct} color="secondary" className="btn btn-secondary bg-seccondary">
                          Close
                        </Button>
                        <Button onClick={handleSubmitAddProduct} color="primary" className="btn btn-primary " >Add</Button>
                      </DialogActions>
                    </Dialog>
                  }

                  <div className="d-flex justify-content-between mb-4">

                    <h4 className="fs-3 fw-semibold" style={{ color: "orange" }}>Product</h4>

                    <Button onClick={() => setOpenForAddProduct(true)}  className="btn btn-primary bg-primary text-white p-2 px-4"  >Add</Button>
                  </div>
                  {
                    isLoadingForProduct ? <div className="text-center mt-4"><CircularProgress/></div> :
                    errorForProduct != null ? <div className="text-danger">{errorForProduct}</div> :
                    products.length == 0 ?  <div>Ürün listesi yok</div> :
                    <table className="table table-hover table-striped">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Category Name</th>
                        <th>Unit Price</th>
                        <th>Unit In Stock</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        filtreProducts.map((product) => {
                          return (
                            <tr key={product.id}>
                              <td>{product.id}</td>
                              <td>{product.productname}</td>
                              <td>{product.categoryName}</td>
                              <td>{product.unitprice}</td>
                              <td>{product.unitsinstock}</td>
                              <td>
                                <button onClick={() => openDialog(product)} className="btn btn-warning  rounded-1">Edit</button>
                                <button onClick={() => deleteProduct(product) } className="btn btn-danger  rounded-1 ms-2">Delete</button>
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                  }
                  
                </div>
                <div>
                  <DataTable/>
                  <Resized defaultWidth={250}>
                    <div></div>  
                  </Resized>
                  <Resized2/>
                  <Resized3/>
                </div>
              </div>
            </div>


          </div>
    </div>
  );

}

export default Product;