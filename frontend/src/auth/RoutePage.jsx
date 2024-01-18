import secureLocalStorage from "react-secure-storage";
import axios from "./AxiosConfig.jsx";
import { jwtDecode } from "jwt-decode";
import Home from "../components/Home.jsx";
import AddStory from "../components/AddStory.jsx";
import EditStory from "../components/EditStory.jsx";
import AddChapter from "../components/AddChapter.jsx";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";

const RoutePage = () => {
  const key = import.meta.env.VITE_API_KEY;
  const getJWT = async () => {
    const response = await axios.get("/api/users/" + key);
    secureLocalStorage.setItem("acessToken", response.data.acessToken);
    secureLocalStorage.setItem("refreshToken", response.data.refreshToken);
    secureLocalStorage.setItem("user", response.data.data);
  };
  let refreshExpires = new Date();
  const refreshToken = secureLocalStorage.getItem("refreshToken");
  if (refreshToken) {
    try {
      refreshExpires = new Date(jwtDecode(refreshToken).exp * 1000);
    } catch (error) {
      getJWT();
    }
  } else {
    getJWT();
  }
  if (refreshExpires <= new Date()) {
    getJWT();
  }

  // declare route
  const navItems = [
    { path: "/", element: <Home /> },
    { path: "/add", element: <AddStory /> },
    { path: "/edit/:id", element: <EditStory /> },
    { path: "/add/Chapter", element: <AddChapter /> },
  ];

  const buildNav = () => {
    return navItems.map((navItem, index) => {
      return (
        <Route key={index} path={navItem.path} element={navItem.element} />
      );
    });
  };

  return (
    <BrowserRouter>
      <Routes>{buildNav()}</Routes>
    </BrowserRouter>
  );
};

export default RoutePage;
