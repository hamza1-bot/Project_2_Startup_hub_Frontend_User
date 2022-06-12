import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useState } from "react";

// Layout component
const Layout = (props) => {
  
  return (
    <>
      <Header></Header>
      {props.children}
      <Footer></Footer>
    </>
  );
};

export default Layout;
