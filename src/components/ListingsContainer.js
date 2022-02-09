import React from "react";
import ListingCard from "./ListingCard";
import { v4 as uuidv4 } from "uuid";

function ListingsContainer({
  listingsArr,
  deleteListingItem,
  searchArr,
  sortArr,
  sortStatus,
}) {
  const displayListings = listingsArr.map((listing) => {
    return (
      <ListingCard
        key={uuidv4()}
        {...listing}
        deleteListingItem={deleteListingItem}
      />
    );
  });


  const displaySearchListing = searchArr.map((listing) => {
    return (
      <ListingCard
        key={uuidv4()}
        {...listing}
        deleteListingItem={deleteListingItem}
      />
    );
  });

  const displaySortListing = sortArr.map((listing) => {
    return (
      <ListingCard
        key={uuidv4()}
        {...listing}
        deleteListingItem={deleteListingItem}
      />
    );
  });

  return (
    <main>
      <ul className="cards">
        {sortStatus
          ? displaySortListing
          : displaySearchListing.length > 0
          ? displaySearchListing
          : displayListings}
    
      </ul>
    </main>
  );
}

export default ListingsContainer;
