import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header';

const AppLayout = () => {
  return (
    <div>
      <main className="">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
