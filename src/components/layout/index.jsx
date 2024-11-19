import { Box, Divider, Stack } from "@mui/material";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const LayoutStyles = {
    container: {
        height: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    main: {
        display: "flex",
        flexGrow: 1,
    },
    sidebar: {
        width: "25vw",
        borderRight: "0.5px solid #e0e0e0",
    },
    content: {
        flexGrow: 1,
        padding: "20vh 1rem 0px 16px",
        backgroundColor: "#152027",
    },
};

export default function Layout({ children }) {
    return (
        <Box sx={LayoutStyles.container}>
            <NavBar />
            <Box sx={LayoutStyles.main}>
                <Box sx={LayoutStyles.sidebar}>
                    <SideBar />
                </Box>
                <Box sx={LayoutStyles.content}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}