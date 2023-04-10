import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { Rating } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { ThreeDots } from  'react-loader-spinner'
import Footer from "../../global/Footer/Footer";

// const mockData = [
//     {
//         category: "men's clothing",
//         description: "asdf",
//         id: 1,
//         image: "https://",
//         price: 109.95,
//         rating: {
//             count: 120,
//             rate: 3.9
//         }
//     },
// ]

const CategoryPage = ({ deviceType, wishlist, setWishlist }) => {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const { category } = useParams();

    useEffect(() => {
        fetch("https://fakestoreapi.com/products")
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    useEffect(() => {
        setSelectedCategory(category);
        setActiveButton(category);
    }, [category]);

    const filteredProducts = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products;

    const handleCategorySelect = (categoryPath) => {
        const actualCategory = categoryPath.split("/")[2];
        setSelectedCategory(actualCategory);
        navigate(`/category/${actualCategory}`, { replace: true });
        setActiveButton(actualCategory);
    };

    const [activeButton, setActiveButton] = useState("");

    const handleToggleWishlist = (product) => {
        const index = wishlist.findIndex((p) => p.id === product.id);
        if (index !== -1) {
          // Product is already in the wishlist, remove it
          const newWishlist = [...wishlist];
          newWishlist.splice(index, 1);
          setWishlist(newWishlist);
          localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        } else {
          // Product is not in the wishlist, add it
          setWishlist((prevWishlist) => [...prevWishlist, product]);
          localStorage.setItem(
            'wishlist',
            JSON.stringify([...wishlist, product])
          );
        }
      };
    
      useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
          setWishlist(JSON.parse(savedWishlist));
        }
      }, [setWishlist]);

    function TextSlice(product) {
        const { text } = product;
        const truncatedText = text.length > 60 ? text.slice(0, 60) + "..." : text;

        return <p className="product-title">{truncatedText}</p>;
    }

    return (
        <div className="category-page-container">
            <div className="category-page-wrapper">
                <div className="category-page-btn"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '15px',
                        color: 'black'
                    }}>
                    <Button
                        className="Button"
                        variant="text"
                        onClick={() => handleCategorySelect("/category/men's clothing")}
                        sx={{ color: activeButton === "men's clothing" ? "#DC9B4E" : "#000000" }}
                        >
                        Men
                    </Button>
                    <Button
                        className="Button"
                        variant="text"
                        onClick={() => handleCategorySelect("/category/women's clothing")}
                        sx={{ color: activeButton === "women's clothing" ? "#DC9B4E" : "#000000" }}
                        >
                        Women
                    </Button>
                    <Button
                        className="Button"
                        variant="text"
                        onClick={() => handleCategorySelect("/category/jewelery")}
                        sx={{ color: activeButton === "jewelery" ? "#DC9B4E" : "#000000" }}
                        >
                        Jewelry
                    </Button>
                    <Button
                        className="Button"
                        variant="text"
                        onClick={() => handleCategorySelect("/category/electronics")}
                        sx={{ color: activeButton === "electronics" ? "#DC9B4E" : "#000000" }}
                        >
                        Electronics
                    </Button>
                </div>
                <div className="products-wrapper">
                {products.length === 0 ? 
                    <div className="react-loader">
                        <ThreeDots 
                            height="80" 
                            width="80" 
                            radius="9"
                            color="#DC9B4E" 
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClassName=""
                            visible={true}
                        />
                        <p>Loading</p>
                    </div> :

                    <div className="category-product-wrapper">
                        <div className="category-product-container">
                            {filteredProducts.map((product) => (
                                
                                <div className="product-card" key={product.id}>
                                    <div className="add-wishlist-wrapper">
                                        <IconButton
                                            className="IconBtn"
                                            onClick={() => handleToggleWishlist(product)}
                                        >
                                            { !(wishlist.some((p) => p.id === product.id)) ? <FavoriteBorderOutlinedIcon /> : <FavoriteOutlinedIcon sx={{ color: '#FF0000' }} />  }
                                        </IconButton>
                                    </div>
                                    <Link to={`/category/${selectedCategory}/product/${product.id}`} >
                                        <div className="card-wrapper">
                                            <div className="product-img-wrapper">
                                                <img src={product.image} alt="women's clothing"/>
                                            </div>
                                            <div className="product-description-wrapper">
                                                <TextSlice text={product.title} />
                                                <div className="price-rating-wrapper">
                                                    <p className="product-price">${product.price}</p>
                                                    <Rating
                                                        name="half-rating-read"
                                                        defaultValue={product.rating.rate}
                                                        readOnly
                                                        precision={0.5}
                                                    />
                                                    <p className="product-rating">{product.rating.rate} • {`(${product.rating.count})`}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                
                            ))}

                        </div>

                        
                    </div>
                }
                </div>
            </div>

            <Footer />

        </div>
    );
};

export default CategoryPage