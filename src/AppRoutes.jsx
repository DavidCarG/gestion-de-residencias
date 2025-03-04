import { Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Layout from "./components/layout/index.jsx";
import ReportsView from "./views/Reports/index.jsx";
import UsersView from "./views/Users/index.jsx";
import ProjectsView from "./views/Projects/index.jsx";
import Login from "./views/Auth/index.jsx";
import Register from "./views/Auth/Register.jsx";
import { useLocation } from "react-router-dom";

const AppRoutes = () => {
  const location = useLocation();
  const excludeLayoutRoutes = ["/login", "/register"];

  return (
    <>
      {excludeLayoutRoutes.includes(location.pathname) ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/home" element={<App />} />
            <Route path="/proyectos" element={<ProjectsView />} />
            <Route path="/usuarios" element={<UsersView />} />
            <Route path="/reportes" element={<ReportsView />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default AppRoutes;
