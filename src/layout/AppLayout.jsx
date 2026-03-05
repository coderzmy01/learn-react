import React from 'react';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import { useNavigation } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

const AppLayout = () => {
  const { state } = useNavigation();
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {state.status === 'loading' && <Spinner />}
      <>
        <Header />
        <div className="overflow-auto">
          <main className="mx-auto max-w-3xl">
            <Outlet />
          </main>
        </div>
        <CartOverview />
      </>
    </div>
  );
};
export default AppLayout;
