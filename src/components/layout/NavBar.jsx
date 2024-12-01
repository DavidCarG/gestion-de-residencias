import { AppBar, Toolbar, Typography } from '@mui/material';

function NavBar() {
    return (
        <AppBar position="fixed" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Residencias Manager
                </Typography>
                <img src="/images/tec-laguna-full-logo-dark-png.png" alt="Tec Laguna Logo" width={300} height={50} />
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;