import React from "react";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import { useNavigation } from "react-router-dom";
import { Spinner } from "../components/Spinner";

const AppLayout = () => {
  const { state } = useNavigation();
  return (
    <div className="layout">
      {state === "loading" && <Spinner />}(
      <>
        <Header />
        <main>
          <Outlet />
        </main>
        <CartOverview />
      </>
      )
    </div>
  );
};
export default AppLayout;
