import { useEffect } from "react";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Footer from "../../global/Footer/Footer";

const WishlistPage = ({ deviceType, wishlist, setWishlist }) => {
    useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
    }
    }, [setWishlist]);

    const handleRemoveItem = (index) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this item?");
        if (confirmDelete) {
            const newWishlist = [...wishlist];
            newWishlist.splice(index, 1);
            setWishlist(newWishlist);
            localStorage.setItem('wishlist', JSON.stringify(newWishlist));
        } else {
            window.alert("Item not removed.");
        }
    };

    return (
        <div className="wishlist-page-container">
            <div className="wishlist-page-wrapper">
                <h1 className="section-title">WISHLIST</h1>

                {wishlist.length > 0 ? (
                    <div className="wishlist-items-container">

                        <hr />

                        {wishlist.map((item, index) => (
                            <div className="wishlist-item" key={index}>
                                <IconButton
                                    className="RemoveBtn"
                                    onClick={() => handleRemoveItem(index)}
                                    >
                                    <CloseOutlinedIcon
                                        fontSize={deviceType === "mobile" ? "medium" : (deviceType === "ipad" || deviceType === "desktop" ? "large" : "")}
                                        />
                                </IconButton>
                                <Link to={`/category/${item.category}/product/${item.id}`} >
                                <div className="item-wrapper-container">
                                    <div className="image-wrapper">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className="item-details">
                                        
                                        <p className="product-title">{item.title}</p>
                                        <p className="product-id">Product id: {item.id}</p>
                                        <p className="product-price">${item.price}</p>
                                    </div>
                                </div>

                                <hr />

                                </Link>
                            </div>
                        ))}
                    </div>
                
                ) : (
                    <div className="wishlist-empty">
                        <p>Your Wishlist has no item</p>
                        <p>Press the heart mark to add items on your wishlist</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default WishlistPage