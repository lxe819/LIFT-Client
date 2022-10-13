import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


interface CategoryItem {
    category_id: number; 
    category_name: string; 
    image: string; 
}

const background1 = "https://cdn.shopify.com/s/files/1/1876/4703/articles/shutterstock_773647054_75791976-9fc3-4e09-a2e8-94fc800507a2_1000x.jpg?v=1620580258"; 
const background2 = "https://myzone-strengtheory.netdna-ssl.com/wp-content/uploads/2016/03/DSC09145.jpg";
const background3 = "https://blog.thewodlife.com.au/wp-content/uploads/2021/04/female-athlete-with-barbell-on-back-1.png";

const SERVER = import.meta.env.VITE_SERVER
const categoriesURL = `${SERVER}/categories`; 

function LandingPage() {

    const [categoriesData, setCategoriesData] = useState<CategoryItem[]>([])

    useEffect(() => {
        fetch(categoriesURL).then(res => res.json()).then(data => setCategoriesData(data.categories))
    }, [])

    const navigate = useNavigate(); 

    return(
        <>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active" style={{backgroundImage: `url(${background1})`, minHeight: "768.875px", backgroundSize: "cover"}}>
                        <div className="container" style={{gridTemplateRows: "minmax(152px, auto) minmax(216px, auto) minmax(16px, auto) minmax(97px, auto) minmax(31px, auto) minmax(51px, auto) 1fr", gridTemplateColumns: "8.49673% 12.6634% 19.3627% 8.49673% 50.9804%" }} >
                            <div className="row p-5" style={{gridRow: "2/3", marginTop: "70px"}}>
                                <div className="col-3" style={{gridColumn: "2/5"}}>
                                    <h1 className="text-white fs-1">Don't <span className="text-info">ego lift</span>.</h1>
                                    <h5 className="text-white my-3">Or maybe you can do it with protection from our knee sleeves. Be protected.</h5>
                                    <button onClick={() => navigate("/categories/3")} className="btn btn-outline-light mt-3 " style={{float: "right", marginRight: "36px"}}>Shop Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item" style={{backgroundImage: `url(${background2})`, minHeight: "768.875px", backgroundSize: "cover", boxShadow: "inset 0 0 0 50vw rgba(0,0,0,0.4)"}}>
                        <div className="container">
                            <div className="row p-5" style={{marginLeft: "0px", marginTop: "400px"}}>
                                <div className="col-4">
                                    <h1 className="text-white" style={{textShadow: "2px 2px 15px black"}}>You've come <span className="text-info">so far</span>.</h1>
                                    <h5 className="text-white" style={{textShadow: "2px 2px 15px black"}}>It's not worth it if you can't get to enjoy your wins. Stay protected.</h5>
                                    <button onClick={() => navigate("/categories/3")} className="btn btn-outline-light mt-3 " style={{float: "none"}}>Shop Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item" style={{backgroundImage: `url(${background3})`, minHeight: "768.875px", backgroundSize: "cover", boxShadow: "inset 0 0 0 50vw rgba(0,0,0,0.4)"}}>
                        <div className="container">
                            <div className="row p-5" style={{marginLeft: "900px", marginTop: "450px"}}>
                                <div className="col-12">
                                    <h1 className="text-white" style={{textShadow: "2px 2px 15px black"}}>Wear your <span className="text-info">belt</span>.</h1>
                                    <h5 className="text-white" style={{textShadow: "2px 2px 15px black"}}>Your safety is our priority. Stay protected.</h5>
                                    <button onClick={() => navigate("/categories/4")} className="btn btn-outline-light mt-3 " style={{float: "none"}}>Shop Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div style={{padding: "60px"}}>
                <div className="mx-5" style={{}}>
                    <h2 className="mb-4"><span className="text-primary">Popular</span> Categories</h2>
                    <div className="d-flex flex-row">
                        {categoriesData.map(cat => (
                            <Link to={`/categories/${cat.category_id}`} className="link-dark" style={{textDecoration: "none"}}>
                            <div className="me-3">
                                <img src={cat.image} style={{minHeight: "240px", maxWidth:"240px", objectFit: "cover", marginBottom: "20px"}} />
                                <h5 className="text-center text-uppercase fw-bold">{cat.category_name}</h5>
                            </div>
                        </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}; 

export default LandingPage; 