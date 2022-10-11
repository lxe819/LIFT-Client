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
}

function CategoryPage() {
  const [categoryProducts, setCategoryProducts] = useState<Products[]>();
  const { category_id } = useParams();
  const navigate = useNavigate();
  // console.log(category_id);
  const url = `http://localhost:5566/products/category/${category_id}`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCategoryProducts(data.products));
  }, [category_id]);

  return (
    <div className="d-flex flex-row">
      {categoryProducts?.map((product) => {
        return (
          <div
            onClick={() => navigate(`/personal/products/${product.product_id}`)}
            key={product.product_id}
            className="m-5"
          >
            <img
              src={product.images[0]}
              style={{
                maxWidth: "200px",
                maxHeight: "200px",
                objectFit: "cover",
              }}
            />
            <h3>{product.product_name}</h3>
            <h5>S${parseInt(product.unit_price)}</h5>
          </div>
        );
      })}
    </div>
  );
}

export default CategoryPage;
