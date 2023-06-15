import React from "react";
import "./CommunityNewSidebar.css";
const CommunityNewSidebar = () => {
  return (
    <header className="header-nav">
      <input type="checkbox" id="sub-nav" />
      <div id="navigation-links">
        <label for="sub-nav" className="sub-nav-toggle">
          <span></span>
        </label>
        <a href="#" className="nav-item">
          Nav Item 1
        </a>
        <a href="#" className="nav-item">
          Nav Item 1
        </a>
      </div>
      <nav id="sub-navigation">
        <a href="#" className="nav-item">
          Sub Nav Item 1
        </a>
        <a href="#" className="nav-item">
          Sub Nav Item 2
        </a>
        <a href="#" className="nav-item">
          Sub Nav Item 3
        </a>
        <a href="#" className="nav-item">
          Sub Nav Item 4
        </a>
      </nav>
    </header>
  );
};

export default CommunityNewSidebar;
