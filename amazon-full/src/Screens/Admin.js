import React from "react";
import { Link } from "react-router-dom";
import "./Css/Admin.css";


function Admin() {

  return (
    <div className="admin">
      <Link to="/admin/products" className="admin__items">
        <p>Products</p>
      </Link>
      <Link to="/admin/orders" className="admin__items">
        <p>Orders</p>
      </Link>
    </div>
  );
}

export default Admin;
