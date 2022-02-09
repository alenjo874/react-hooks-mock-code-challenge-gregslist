import React from "react";
import Search from "./Search";

function Header({ searchListingItem, sortListingItem }) {
  function handleSort() {
    sortListingItem();
  }

  return (
    <header>
      <h1>
        <span className="logo" role="img">
          ☮
        </span>
        gregslist
      </h1>
      <Search searchListingItem={searchListingItem} />
      <button onClick={handleSort}>Sort A-Z</button>
    </header>
  );
}

export default Header;
