import React, { Component } from "react";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const App = ({ children }) => {
  return (
    <>
      <Header />

      <main>{children}</main>

      <Footer />
    </>
  );
};

export default App;
