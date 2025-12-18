// src/App.jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Pricing from './pages/Pricing';
import Product from './pages/Product';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="product" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route
            path="cities"
            element={
              <>
                <h1 style={{ color: 'orange' }}>你们好</h1>
              </>
            }
            index
          />
          <Route
            path="counties"
            element={
              <>
                <h1 className="text-red-400">你们好</h1>
              </>
            }
          />
          <Route />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
