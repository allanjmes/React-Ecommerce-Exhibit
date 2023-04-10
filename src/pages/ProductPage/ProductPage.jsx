import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Rating, Button } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { ThreeDots } from  'react-loader-spinner'
import Footer from "../../global/Footer/Footer";

const ProductPage = ({ cart, setCart, wishlist, setWishlist, deviceType }) => {
  const { id } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);

  const handleAddToCart = () => {
    if (!cart.some((p) => p.id === singleProduct.id)) {
      setCart((prevCart) => [...prevCart, singleProduct]);
      localStorage.setItem('cart', JSON.stringify([...cart, singleProduct]));
    }
  };

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setSingleProduct(data));
  }, [id]);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [setCart]);

  const handleAddToWishlist = () => {
    if (!wishlist.some((p) => p.id === singleProduct.id)) {
      setWishlist((prevWishlist) => [...prevWishlist, singleProduct]);
      localStorage.setItem('wishlist', JSON.stringify([...wishlist, singleProduct]));
    }
  };

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, [setWishlist]);

  if (!singleProduct) {
    return (
        <div className="react-loader-product">
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
        </div>
    )
  }

  return (
    <div className='product-page-container'>
      <div className="product-page-wrapper">
        <p className='product-title'>{singleProduct.title}</p>
        <div className="rating-and-price-wrapper">
          <div className="rating-wrapper">
            <Rating name="half-rating-read"
              defaultValue={singleProduct.rating.rate}
              readOnly precision={0.5}
              size={deviceType === "mobile" ? "medium" : (deviceType === "ipad" || "desktop" ? "large" : "")}
              />
            <p className="product-rating">{singleProduct.rating.rate} • {`(${singleProduct.rating.count})`}</p>
          </div>
          <div className="price-wrapper">
            <p className='product-price'>${singleProduct.price}</p>
          </div>
        </div>
        <p className='product-description'>{singleProduct.description}</p>
        
        <div className="image-wrapper">
          <img src={singleProduct.image} alt={singleProduct.title} />
        </div>

        <div className="button-wrapper">
          <Button variant="outlined"
            endIcon={<ShoppingCartOutlinedIcon size="inherit"/>}
            className="Button"
            sx={{
              width: '90%',
              height: deviceType === "mobile" ? "40px" : (deviceType === "ipad" || "large" ? "60px" : ""),
              border: '2px solid #000000',
              borderRadius: '15px',
              color: 'black',
              backgroundColor: '#DC9B4E'
            }}
            onClick={() => handleAddToCart()}
          >
            Add to cart
          </Button>
          <Button variant="outlined"
            endIcon={<FavoriteBorderOutlinedIcon size="inherit"/>}
            className="Button"
            sx={{
              width: '90%',
              height: deviceType === "mobile" ? "40px" : (deviceType === "ipad" || "large" ? "60px" : ""),
              border: '2px solid #000000',
              borderRadius: '15px',
              color: 'black',
            }}
            onClick={() => handleAddToWishlist()}
          >
            Add to Wishlist
          </Button>
        </div>
      </div>

      <Footer />

    </div>
  );
};

export default ProductPage