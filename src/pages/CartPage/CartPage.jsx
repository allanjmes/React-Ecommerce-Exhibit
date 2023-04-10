import { Button, IconButton } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import Footer from "../../global/Footer/Footer";


const CartPage = ({ deviceType, cart, setCart }) => {
  const [subTotal, setSubtotal] = useState([])
  const [totalPrice, setTotalPrice] = useState()
  const [productQuantity, setProductQuantity] = useState([])

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, [setCart]);

  // Calculate the initial subtotal for each item in the cart and calculate the subtotal
  useEffect(() => {
      const subtotals = cart.map(item => item.subTotalPrice || item.price);
      setSubtotal(subtotals);
  
      const total = subtotals.reduce((acc, curr) => acc + curr, 0);
      setTotalPrice(total);

      const quantities = cart.map(item => item.quantity || 1);
      setProductQuantity(quantities);
  }, [cart]);

  // const handleQuantityChange = (event, index) => {
  //   const newCart = [...cart];
  //   newCart[index].quantity = event.target.value;
  //   newCart[index].subTotalPrice = newCart[index].price * newCart[index].quantity;
  //   setCart(newCart);
    
  //   const subtotals = newCart.map(item => item.subTotalPrice);
  //   setSubtotal(subtotals);

  //   localStorage.setItem('cart', JSON.stringify(newCart));
  // };

  const handleQuantityChange = (event, index) => {
    const newCart = [...cart];
    newCart[index].quantity = event.target.value;
    newCart[index].subTotalPrice = newCart[index].price * newCart[index].quantity;
    setCart(newCart);
    const newProductQuantity = [...productQuantity];
    newProductQuantity[index] = event.target.value;
    setProductQuantity(newProductQuantity);
    const subtotals = newCart.map((item) => item.subTotalPrice);
    setSubtotal(subtotals);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleRemoveItem = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this item?");
    if (confirmDelete) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    } else {
      window.alert("Item not removed.");
    }
  };

  return (
    <div className="cart-page-container">
      <div className="cart-page-wrapper">
        <h1 className="section-title">SHOPPING CART</h1>
        
        {cart.length > 0 ? (
          <div className="cart-wrapper">

            <hr />

            <div className="cart-items">
              {cart.map((item, index) => (
                <div className="cart-item" key={index}>
                  <div className="item-wrapper-container">
                    <div className="image-wrapper">
                      <img src={item.image} alt={item.title} />
                    </div>
                    <div className="item-details">
                      <IconButton
                        className="RemoveBtn"
                        onClick={() => handleRemoveItem(index)}
                        >
                        <CloseOutlinedIcon
                          fontSize={deviceType === "mobile" ? "medium" : (deviceType === "ipad" || deviceType === "desktop" ? "large" : "")}
                          />
                      </IconButton>
                      <p className="product-title">{item.title}</p>
                      <p className="product-id">Product Id: {item.id}</p>
                      <p className="product-price">${item.price}</p>
                      <p className="product-quantity">QUANTITY:</p>
                      <div className="quantity-button-wrapper">
                        <IconButton className="Button"
                          variant="outlined"
                          size="sm"
                          sx={{ 
                            height: '20px',
                            width: '20px',
                            padding: '0',
                            border: '1px solid gray',
                            borderRadius: '0',
                          }}
                          disabled={item.quantity === 1 ? true : false}
                          onClick={() => handleQuantityChange({ target: { value: item.quantity ? item.quantity - 1 : 1 } }, index)}
                          >
                          <RemoveOutlinedIcon />
                        </IconButton>
                        <div className="quantity-wrapper">
                          <p>{item.quantity ? item.quantity : 1}</p>
                        </div>
                        <IconButton className="Button"
                          variant="outlined"
                          size="small"
                          sx={{ 
                            height: '20px',
                            width: '20px',
                            padding: '0',
                            border: '1px solid gray',
                            borderRadius: '0',
                          }}
                          onClick={() => handleQuantityChange({ target: { value: (item.quantity ? item.quantity : 1) + 1 } }, index)}
                          >
                          <AddOutlinedIcon />
                        </IconButton>
                      </div>
                      
                    </div>
                  </div>
                  <div className="subtotal-wrapper-container">
                    <div className="subtotal-container">
                      <p>Subtotal: ${subTotal[index] ? subTotal[index].toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : "0.00"}</p>
                    </div>
                  </div>

                  <hr />

                </div>
              ))}
            </div>

            <div className="checkout-container">
              <div className="order-summary">
                <p>Order Summary:</p>
                <p>Number of Item: {cart.length}</p>
              </div>
              <div className="checkout">
                <p>Total price: ${totalPrice ? totalPrice.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2}) : "0.00"}</p>
                <Button
                  variant="contained"
                  className="Button"
                  sx={{
                    backgroundColor: 'red',
                    color: 'white',
                  }}
                  >
                  Checkout
                </Button>
              </div>
            </div>

          </div>
        ) : (
          <div className="shopping-cart-empty">
            <p>Your cart is currently empty</p>
            <Link to="/">
              <Button
                variant="contained"
                className="Button"
                sx={{
                  height: '40px',
                  border: '2px solid #000000',
                  borderRadius: '10px',
                  color: 'black',
                  backgroundColor: '#DC9B4E'
                }}
                >
                Continue Shopping
                </Button>
            </Link>
          </div>
        )}
      </div>
      
      <Footer />

    </div>
  )
}

export default CartPage