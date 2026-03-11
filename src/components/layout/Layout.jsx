import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollTop from '../ui/ScrollTop';

const Layout = () => (
  <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--txt)' }}>
    <Navbar />
    <Outlet />
    <Footer />
    <ScrollTop />
  </div>
);

export default Layout;
