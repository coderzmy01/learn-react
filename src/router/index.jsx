// src/router/index.js
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';

import Home from '../components/Home';
import Order, {
  loader as orderLoader,
} from '../features/order/Order';
import CreateOrder, {
  action as CreateOrderAction,
} from '../features/order/CreateOrder';
import Cart from '../features/cart/Cart';
import Menu, {
  loader as menuLoader,
} from '../features/menu/Menu';
import Error from '../components/Error';
const routes = [
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: '/order/:orderId',
        element: <Order />,
        loader: orderLoader,
      },
      {
        path: '/order/create',
        element: <CreateOrder />,
        action: CreateOrderAction,
      },
      { path: '/cart', element: <Cart /> },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
    ],
  },
];
// 定义路由配置
const router = createBrowserRouter(routes);

export default router;
