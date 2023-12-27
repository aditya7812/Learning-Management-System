import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const NavLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default NavLayout;
