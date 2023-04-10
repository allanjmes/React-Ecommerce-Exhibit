import { Sidebar, Menu, MenuItem, useProSidebar } from 'react-pro-sidebar';
import { Link, useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


const SidebarSection = () => {
    const { rtl, toggleSidebar } = useProSidebar();

    const navigate = useNavigate();

    const handleCategoryClick = (categoryPath) => {
        const actualCategory = categoryPath.split("/")[2];
        navigate(`/category/${actualCategory}`);
    };

    return (
      <div
        className='sidebar-section-container'
        style={{ direction: rtl ? 'rtl' : 'ltr' }}>
        <Sidebar rtl breakPoint="always" width="70vw" backgroundColor='#ffffff' >
          
          <div className='close-btn-wrapper'>
            <CloseOutlinedIcon className='close-icon' fontSize="large" onClick={() => toggleSidebar()} />
          </div>

          <hr className='hr-accent' />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Menu>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <MenuItem
                  component={<Link to="category/men's clothing" />}
                  onClick={() => {handleCategoryClick("category/men's clothing"); toggleSidebar(); }}
                  className='sidebar-category'
                  style={{ textAlign: 'center' }}
                >
                Men
                </MenuItem>
                <MenuItem
                  component={<Link to="category/women's clothing" />}
                  onClick={() => {handleCategoryClick("category/women's clothing"); toggleSidebar(); }} 
                  className='sidebar-category' 
                  style={{ textAlign: 'center' }}
                  > 
                  Women 
                </MenuItem>
                <MenuItem
                  component={<Link to="category/jewelery" />}
                  onClick={() => {handleCategoryClick("category/jewelery"); toggleSidebar(); }}
                  className='sidebar-category' 
                  style={{ textAlign: 'center' }}
                  > 
                  Jewelry 
                </MenuItem>
                  <MenuItem
                    component={<Link to="category/electronics" />}
                    onClick={() => {handleCategoryClick("category/electronics"); toggleSidebar(); }}
                    className='sidebar-category' 
                    style={{ textAlign: 'center' }}
                    > 
                    Electronics 
                  </MenuItem>
              </div>
            </Menu>
          </div>

          <hr className='hr-accent' />

          <div className='sidebar-btn-container'>
            <div className='sidebar-btn-wrapper'>
              <div className='cart-wishlist-container'>
                <Link to="/wishlist" >
                <Button variant="outlined"
                  sx={{
                    width: '70%',
                    height: '40px',
                    border: '2px solid #000000',
                    borderRadius: '15px',
                    color: 'black',
                  }}
                  onClick={() => toggleSidebar() }
                >
                  View Wishlist
                  <FavoriteBorderOutlinedIcon size="inherit"/>
                </Button>
                </Link>
                <Link to="/cart" >
                <Button variant="outlined"
                  sx={{
                    width: '70%',
                    height: '40px',
                    border: '2px solid #000000',
                    borderRadius: '15px',
                    color: 'black',
                    backgroundColor: '#DC9B4E'
                  }}
                  onClick={() => toggleSidebar() }
                >
                  View Cart
                  <ShoppingCartOutlinedIcon size="inherit"/>
                </Button>
                </Link>
              </div>
              <div className='login-container'>
                <Button variant="outlined"
                  sx={{
                    width: '70%',
                    height: '40px',
                    border: '2px solid #000000',
                    borderRadius: '15px',
                    color: 'black',
                  }}
                >
                    Login
                    <PersonOutlineOutlinedIcon size="inherit"/>
                </Button>
                <Button variant="outlined"
                  sx={{
                    width: '70%',
                    height: '40px',
                    border: '2px solid #000000',
                    borderRadius: '15px',
                    color: 'black',
                    backgroundColor: '#DC9B4E'
                  }}
                >
                  Sign up
                </Button>
              </div>
            </div>
          </div>
          
        </Sidebar>
      </div>
    );
}

export default SidebarSection