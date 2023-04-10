import Logo from '../../assets/logo/exhibit-logo.png'
import { Link } from "react-router-dom";
import { useProSidebar } from 'react-pro-sidebar';
import { IconButton } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

const Topbar = ({ deviceType, cart, wishlist }) => {
    const { toggleSidebar } = useProSidebar();

    return (
        <header className="header">
            <nav className="navbar">
                <div className="logo-wrapper">
                    <img className="logo" alt='tshirt' src={Logo} />
                    <div className="title">
                        <Link to="/">EXHIBIT</Link>
                    </div>
                </div>
                {deviceType === "ipad" &&
                <div className="category-wrapper">
                    <Link to="/category/men's clothing">Men</Link>
                    <Link to="/category/women's clothing">Women</Link>
                    <Link to="/category/jewelery">Jewelry</Link>
                    <Link to="/category/electronics">Electronics</Link>
                </div>}
                <div className="topbar-btn-container">
                    <Link to="wishlist" className='wish-list-btn'>
                        <IconButton>
                            <FavoriteBorderOutlinedIcon className='wishlist-btn'
                            fontSize={deviceType === "mobile" ? "medium" : (deviceType === "ipad" || deviceType === "desktop" ? "large" : "")} />
                        </IconButton>
                        {wishlist.length > 0 &&
                        <div className='wishlist-item-number'>
                            <span>{wishlist.length}</span>
                        </div>
                        }
                    </Link>
                    <Link to="cart" className='shopping-cart-btn'>
                        <IconButton>
                            <ShoppingCartOutlinedIcon className='cart-btn'
                            fontSize={deviceType === "mobile" ? "medium" : (deviceType === "ipad" || deviceType === "desktop" ? "large" : "")} />
                        </IconButton>
                        {cart.length > 0 &&
                        <div className='cart-item-number'>
                            <span>{cart.length}</span>
                        </div>
                        }
                    </Link>
                    {deviceType === "mobile" &&
                    <IconButton
                        onClick={() => toggleSidebar()}
                        >
                        <MenuOutlinedIcon className='menu-btn'
                        fontSize={deviceType === "mobile" ? "medium" : (deviceType === "ipad" || deviceType === "desktop" ? "large" : "")} />
                    </IconButton>}
                </div>
            </nav>
        </header>
    )
}

export default Topbar