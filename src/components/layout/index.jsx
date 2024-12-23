import { Box } from "@mui/material";
import SideBar from "./SideBar";
import PropTypes from "prop-types";
import NavBar from "./NavBar";

const LayoutStyles = {
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "row",
  },
  content: {
    backgroundColor: "#152027",
    height: "100%",
    width: "90vw",
  },
};

export default function Layout({ children }) {
  return (
    <Box sx={LayoutStyles.container}>
      <NavBar />
      <SideBar />
      <Box sx={LayoutStyles.content}>{children}</Box>
    </Box>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
