import React from 'react'
import AdminSlideBar from '../adminComponents/AdminSlideBar'
import { Route, Routes } from 'react-router-dom';
import OrdersPage from '../adminComponents/OrdersPage'
import BooksPage from '../adminComponents/BooksPage';
import DiscountPage from '../adminComponents/DiscountPage';
import UsersPage from '../adminComponents/UsersPage';
import ReviewsPage from '../adminComponents/ReviewsPage';
import DashboardPage from '../adminComponents/DashboardPage';

const AdminPage = () => {
  return (
    <div className="flex">
      <AdminSlideBar />
      <div className="flex-1 min-h-screen bg-gray-100 pl-10 md:pl-60 ">
        <div className="pt-5 p-1">
          <Routes >
            <Route path='/' element={<DashboardPage />} />
            <Route path='/orders' element={<OrdersPage />} />
            <Route path='/books' element={<BooksPage />} />
            <Route path='/discounts' element={<DiscountPage />} />
            <Route path='/users' element={<UsersPage />} />
            <Route path='/reviews' element={<ReviewsPage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
