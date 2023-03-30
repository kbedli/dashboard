import React from "react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillPeopleFill, BsCurrencyDollar } from "react-icons/bs";

import { CgNotes } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar-div" data-testid="sidebar-div">
      <div className="photo" data-testid="photo">
        A
      </div>
      <h3 className="name" data-testid="name">
        Admin
      </h3>
      <p className="email" data-testid="email">
        kbedlinska@gmail.com
      </p>

      <p className="menu-option">
        <AiOutlineHome className="icons" /> Dashboard
      </p>
      <p className="dashboard-titles">Data</p>
      <p className="menu-option">
        <BsFillPeopleFill className="icons" /> Customers
      </p>
      <p className="menu-option">
        <BsCurrencyDollar className="icons" /> Earnings
      </p>
      <p className="menu-option">
        <AiOutlineShoppingCart className="icons" /> Product Sales
      </p>
      <p className="menu-option">
        <CgNotes className="icons" /> Store Management
      </p>
      <p className="menu-option">
        <IoMdSettings className="icons" /> Settings
      </p>
    </div>
  );
};

export default Sidebar;
