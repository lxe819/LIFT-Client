import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Products {
    product_id: number;
    product_name: string;
    images: string[];
    short_desc: string;
    unit_price: string;
    sizing: string[];
    category_name: string
  }

interface Stocks {
    stock_id: number;
    product_id: number; 
    product_name: string; 
    stock_size: string | null; 
    stock_qty: number 
}

const SERVER = import.meta.env.VITE_SERVER; 
const productsURL = `${SERVER}/products/categoryname`; 
const stocksURL = `${SERVER}/stocks/productname`;   //! To check again
function AdminProductsPage({ token }: { token: string }){

    const [products, setProducts] = useState<Products[]>([]); 
    const [stocks, setStocks] = useState<Stocks[]>([]); 
    const navigate = useNavigate(); 

    // Fetch all products with categories attached
    useEffect(() => {
        fetch(productsURL).then(response => response.json()).then(data => setProducts(data.allProducts)); 

        fetch(stocksURL).then(response => response.json()).then(data => setStocks(data.stocks)); 
    }, [])


    return (
        <>
            <h1>Products Page</h1>
            <button onClick={() => navigate("/admin/products/record")} className="btn btn-danger">Add New Product</button>
            <table>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Images</th>
                        <th>Short Description</th>
                        <th>Unit Price</th>
                        <th>Sizing</th>
                        <th>Category</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((pdt, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td>{pdt.product_id}</td>
                            <td>{pdt.product_name}</td>
                            <td className="d-flex flex-row">{pdt.images.map(url => <img src={url} style={{
                    maxWidth: "50px",
                    maxHeight: "50px",
                    objectFit: "cover",
                    }} className="me-1" />)}</td>
                            <td>{pdt.short_desc}</td>
                            <td>{pdt.unit_price}</td>
                            <td>{pdt.sizing}</td>
                            <td>{pdt.category_name}</td>
                            <td><button>Edit</button></td>
                            <td><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>STOCK QTY TABLE</h2>
            <table>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Stock ID</th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Stock Size</th>
                        <th>Stock QTY</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {stocks.map((record, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td>{record.stock_id}</td>
                            <td>{record.product_id}</td>
                            <td>{record.product_name}</td>
                            <td>{record.stock_size}</td>
                            <td>{record.stock_qty}</td>
                            <td><button>Edit</button></td>
                            <td><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}; 

export default AdminProductsPage; 