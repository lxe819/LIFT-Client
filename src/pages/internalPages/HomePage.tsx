import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SERVER = import.meta.env.VITE_SERVER
const url = `${SERVER}/categories`;

interface Categories {
  category_id: number;
  category_name: string;
  created_on: string;
}
// created_on is a TIMESTAMP format......

function Homepage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setCategories(data.categories));
  }, []);

  return (
    <>
      {categories.map((category) => (
        <div
          onClick={() => {
            navigate(`/personal/categories/${category.category_id}`);
            // setCategoryClicked(category.category_id); 
          }}
          key={category.category_id}
        >
          {category.category_name}
        </div>
      ))}
    </>
  );
}

export default Homepage;
