import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
};
export default AppLayout;
