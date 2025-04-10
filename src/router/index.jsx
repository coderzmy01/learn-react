// src/router/index.js
import { createBrowserRouter } from 'react-router-dom';
// 导入你的组件
import App from '../App.jsx';
import TravelList from '../components/chapter06/TravelList/index.jsx';
import TipCalculator from '../components/chapter07/TipCalculator/index.jsx';
import NotFound from '../components/NotFound/index.jsx';

// 定义路由配置
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <TipCalculator />,
      },
      {
        path: 'travel-list',
        element: <TravelList />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
