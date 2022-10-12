import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


interface Categories {
    category_id: number; 
    category_name: string; 
    created_on: Date;
}

const SERVER = import.meta.env.VITE_SERVER; 
const categoriesURL = `${SERVER}/categories`; 
function AdminCategoriesPage({ token }: { token: string }){
    const [categories, setCategories] = useState<Categories[]>([]); 
    // const [value, setValue] = useState<string>("")
    const navigate = useNavigate(); 

    useEffect(() => {
        fetch(categoriesURL).then(response => response.json()).then(data => setCategories(data.categories)); 
    }, []); 


    const handleEdit = (category_id: number) => {
        navigate(`/admin/categories/record/${category_id}`); 
    }

    return (
        <>
            <h1>Categories Page</h1>
            <table>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Category Name</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {categories?.map((cat, index) => (
                        <tr key={cat.category_id}>
                            <td>{index + 1}</td>
                            <td>{cat.category_name}</td>
                            <td>
                                <button onClick={() => handleEdit(cat.category_id)} type="submit" className="btn btn-primary">Edit</button>
                            </td>
                            <td><button className="btn btn-danger">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigate("/admin/categories/record")} className="btn btn-primary">Add New Category</button>
        </>
    )
}

export default AdminCategoriesPage; 