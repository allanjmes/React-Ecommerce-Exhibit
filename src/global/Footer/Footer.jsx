import { Button } from "@mui/material"
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import DrawOutlinedIcon from '@mui/icons-material/DrawOutlined';

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="footer-wrapper">
                <div className="section-developer-details">
                    <p className="developer">Developed by: Aj Regala</p>
                    <p className="email">Email: allanjames.regala@gmail.com</p>
                </div>
                <div className="section-build-details">
                    <p className="built">Built with: React, Meterial-UI, React Pro Sidebar</p>
                    <p className="rights">© 2023 Exhibit. All rights reserved</p>
                </div>
                <div className="section-code-details">
                    <Button variant="outlined"
                        startIcon={<CodeOutlinedIcon />}
                        href="https://github.com/allanjmes/React-Ecommerce-Exhibit"
                        sx={{
                            color: 'black',
                            borderColor: 'black'
                        }}
                        >
                        Code
                    </Button>
                    <Button variant="outlined"
                        startIcon={<DrawOutlinedIcon />}
                        href="https://www.figma.com/file/0982U3FqceX7lVIXnimtKc/E-COMMERCE---EXHIBIT?node-id=0-1&t=cl02L3hElW7psxLe-0"
                        sx={{
                            color: 'black',
                            borderColor: 'black'
                        }}
                    >
                        Design
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Footer