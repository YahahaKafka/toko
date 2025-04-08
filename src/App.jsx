// import { useState } from "react"; //
import Navbar from "./component/Display/Navbar";
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./component/Display/Footer";
import ProductDetail from "./component/Display/ProductDetail";
import ScrollToTop from "./util/ScrollTop";




function App() {
  return (
    <BrowserRouter>
      <MainContent />
    </BrowserRouter>
  );
}

function MainContent() {
  const { pathname } = useLocation();
  

  return (
    <div className="max-sm:w-screen cursor-default">
      <ScrollToTop/>
      {!/^\/product\/[^/]+$/.test(pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </div>
  );
}


export default App;
