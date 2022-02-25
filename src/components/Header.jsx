import React from "react";
import NewTask from "./header_components/NewTask";
import Sort from "./header_components/Sort";

const Header = () => (
  <div>
    <h1>To Do List</h1>
    <div className="subheader">
      <NewTask />
      <Sort />
    </div>
  </div>
);

export default Header;
