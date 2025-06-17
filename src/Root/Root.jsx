import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ScrollToTop from "../Page/ScrollToTop";
import CursorEffect from "../Page/CursorEffect";



const Root = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <CursorEffect type="jori" /> 
      <Navbar />
      <ScrollToTop></ScrollToTop>
      <div className="flex-grow  mt-17">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
