import { Link, useNavigate } from "react-router-dom";
import { Button } from '@mui/material'
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Footer from "../../global/Footer/Footer";

const LandingPageData = [
    {
        title: "Men's",
        category: "men's clothing",
        description1: "Wide range of garments designed",
        description2: "specifically for men.",
        src: "Men.jpg",
        alt: "men-at-mountain",
        link: "/category/men's clothing"
    },
    {
        title: "Women's",
        category: "women's clothing",
        description1: "Various styles and designs for",
        description2: "different seasons.",
        src: "Women.jpg",
        alt: "women-at-sunflower-farm",
        link: "/category/women's clothing"
    },
    {
        title: "Jewelry",
        category: "jewelery",
        description1: "Appropriate piece can enhance",
        description2: "the elegance of an outfit.",
        src: "Jewelry.jpg",
        alt: "necklace-bracelet",
        link: "/category/jewelery"
    },
    {
        title: "Electronics",
        category: "electronics",
        description1: "Make your life more convenient,",
        description2: "efficient and enjoyable.",
        src: "Electronics.jpg",
        alt: "kitchen-appliances",
        link: "/category/electronics"
    },
]

const LandingPage = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (categoryPath) => {
        const actualCategory = categoryPath.split("/")[2];
        navigate(`/category/${actualCategory}`);
    };

    return (
        <div className='main-content-container'>
            <div className="main-content-wrapper">
                {LandingPageData.map(item => (

                <div className='section' key={item.title}>
                    <img src={require(`../../assets/images/${item.src}`)} alt={item.alt}/>
                    <div className='section-details-wrapper'>
                        <div className='section-title'>
                            {item.title}
                        </div>
                        <div className="section-description">
                            {item.description1} <p>{item.description2}</p>
                        </div>
                        <Link key={item.category}
                            to={item.link}
                            onClick={() => handleCategoryClick(item.link)}>
                            <Button variant="contained"
                                endIcon={<ArrowForwardOutlinedIcon size="inherit" />}
                                sx={{
                                    height: '40px',
                                    borderRadius: '0',
                                    color: 'black',
                                    backgroundColor: '#DC9B4E'
                                }}
                            >
                                View
                            </Button>
                        </Link>
                    </div>
                </div>
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default LandingPage