import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Products {
  product_id: number;
  product_name: string;
  images: string[];
  short_desc: string;
  unit_price: string;
  stock: number;
  sizing: string[];
  created_on: string;
  category_id: number;
  category_name: string; 
}

function CategoryPage({ token }: { token: string }) {
  const [categoryProducts, setCategoryProducts] = useState<Products[]>();
  const { category_id } = useParams();
  const navigate = useNavigate();
  const SERVER = import.meta.env.VITE_SERVER
  const url = `${SERVER}/products/category/${category_id}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCategoryProducts(data.products));
  }, [category_id]);

  return (
    <>
    <div style={{padding: "60px"}}>
      <div className="mx-5">
        <div className="container">
          <h1 className="mb-4">{categoryProducts?.[0].category_name}</h1>
        <div className="row row-cols-4">
          {categoryProducts?.map((product) => {
            return (
              <div
                onClick={() => (token ? navigate(`/personal/products/${product.product_id}`) : navigate(`/denied`)) }
                key={product.product_id}
                className="col p-5 border me-3 mb-4 bg-white"
                style={{ borderRadius: "8px" }}
              >
                <img
                  src={product.images[0]}
                  style={{
                    minHeight: "220px",
                    maxHeight: "220px", 
                    maxWidth: "220px",
                    objectFit: "cover",
                    marginBottom: "20px",
                  }}
                />
                <div className="mt-4">
                <h4>{product.product_name}</h4>
                <h6>S${parseInt(product.unit_price)}</h6>
                </div>
              </div>
            );
          })}
        </div>
</div>
      </div>

    </div>
    </>
  );
}

export default CategoryPage;
