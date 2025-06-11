import { Outlet } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ScrollToTop from "../Page/ScrollToTop";


const Root = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <ScrollToTop></ScrollToTop>
      <div className="flex-grow pt-2 mt-17">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
