import React from 'react'
import './CommunityNewSidebar.css';
const CommunityNewSidebar = () => {
  return (
    <header class="header-nav">
  <input type="checkbox" id="sub-nav" />
  <div id="navigation-links">
    <label for="sub-nav" class="sub-nav-toggle"><span></span></label>
        <a href="#" class="nav-item">Nav Item 1</a>
      <a href="#" class="nav-item">Nav Item 1</a>

  </div>
  <nav id="sub-navigation">
    <a href="#" class="nav-item">Sub Nav Item 1</a>
    <a href="#" class="nav-item">Sub Nav Item 2</a>
    <a href="#" class="nav-item">Sub Nav Item 3</a>
    <a href="#" class="nav-item">Sub Nav Item 4</a>
  </nav>
</header>
  )
}

export default CommunityNewSidebar