import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import "./Layout.css";

function Layout() {
  return (
    <div className="container-fluid d-flex flex-column h-100 p-0">
      <div className="row">
        <Menu />
      </div>
      <div id="main-view" className="row flex-fill d-flex bg-dark text-white">
        <Routes />
      </div>
    </div>
  );
}

export default Layout;
