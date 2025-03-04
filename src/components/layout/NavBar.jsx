import { useState } from 'react';
import { AppBar, Toolbar, Typography, Slide, IconButton } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function NavBar() {
    const [show, setShow] = useState(true);

    const toggleNavbar = () => {
        setShow((prev) => !prev);
    };

    return (
        <>
            <Slide in={show} direction="down">
                <AppBar position="fixed" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Residencias Manager
                        </Typography>
                        <img src="/images/tec-laguna-full-logo-dark-png.png" alt="Tec Laguna Logo" width={300} height={50} />
                    </Toolbar>
                </AppBar>
            </Slide>
            <IconButton
                onClick={toggleNavbar}
                sx={{
                    position: 'fixed',
                    top: show ? 70 : 10, // Dynamically adjust position
                    left: '50%',
                    marginTop: '-20px',
                    transform: 'translateX(-50%)',
                    zIndex: 1201, // Ensure it's above other elements
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    },
                }}
            >
                {show ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
        </>
    );
}

export default NavBar;
