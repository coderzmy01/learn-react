// src/router/index.js
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout";

import Home from "../components/Home";
import Order from "../features/order/Order";
import CreateOrder from "../features/order/CreateOrder";
import Cart from "../features/cart/Cart";
import Menu, { loader as menuLoader } from "../features/menu/Menu";
const routes = [
  {
    element: <AppLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/order/:orderId", element: <Order /> },
      { path: "/order/create", element: <CreateOrder /> },
      { path: "/cart", element: <Cart /> },
      { path: "/menu", element: <Menu />, loader: menuLoader },
    ],
  },
];
// 定义路由配置
const router = createBrowserRouter(routes);

export default router;
