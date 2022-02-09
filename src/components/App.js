import React, { useState, useEffect } from "react";
import Header from "./Header";
import ListingsContainer from "./ListingsContainer";

function App() {
  const [listingsArr, setListingsArr] = useState([]);
  const [searchArr, setSearchArr] = useState([]);
  const [sortArr, setSortArr] = useState([]);
  const [sortStatus, setSortStatus] = useState(false);

  useEffect(() => {
    fetch("http://localhost:6001/listings")
      .then((res) => res.json())
      .then(setListingsArr);
  }, []);

  function deleteListingItem(id) {
    const newListingArr = listingsArr.filter((listing) => listing.id !== id);
    setListingsArr(newListingArr);

    fetch(`http://localhost:6001/listings/${id}`, {
      method: "DELETE",
    });
  }

  function searchListingItem(searchInput) {
    const newSearchListingArr = listingsArr.filter((listing) =>
      listing.description.toLowerCase().includes(searchInput.toLowerCase())
    );
    setSortStatus(false);
    setSearchArr(newSearchListingArr);
  }

  function sortListingItem() {
    const sortListingsArr = listingsArr.sort(function (a, b) {
      if (a.location.toLowerCase() < b.location.toLowerCase()) {
        return -1;
      }
      if (a.location.toLowerCase() > b.location.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    setSortStatus((prev) => !prev);
    setSortArr(sortListingsArr);
  }

  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [location, setLocation] = useState("");

  function handleNewListing(e) {
    e.preventDefault();
    const newListingObj = { description, image, location };

    // setListingsArr((prev) => [...prev, newListingObj]);

    fetch("http://localhost:6001/listings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newListingObj),
    })
      .then((response) => response.json())
      .then((newListItem) => {
        setListingsArr((prev) => [...prev, newListItem]);
      });
  }

  return (
    <div className="app">
      <Header
        searchListingItem={searchListingItem}
        sortListingItem={sortListingItem}
      />
      <form className="listing-form" onSubmit={handleNewListing}>
        <h3>Add New Lsiting</h3>
        <label>Description</label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></input>
        <label>Image Link</label>
        <input
          type="text"
          onChange={(e) => setImage(e.target.value)}
          value={image}
        ></input>
        <label>Location</label>
        <input
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
        ></input>
        <button type="submit">Submit</button>
      </form>
      <ListingsContainer
        listingsArr={listingsArr}
        deleteListingItem={deleteListingItem}
        searchArr={searchArr}
        sortArr={sortArr}
        sortStatus={sortStatus}
      />
    </div>
  );
}

export default App;
