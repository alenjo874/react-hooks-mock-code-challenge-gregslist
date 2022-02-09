import React, { useState } from "react";

function ListingCard({ id, description, image, location, deleteListingItem }) {
  const [favorited, setFavorited] = useState(false);

  function handleFav() {
    setFavorited((prev) => !prev);
  }

  const activeFavButton = (
    <button className="emoji-button favorite active" onClick={handleFav}>
      ★
    </button>
  );
  const inActiveFavButton = (
    <button className="emoji-button favorite" onClick={handleFav}>
      ☆
    </button>
  );

  function handleDelete() {
    deleteListingItem(id);
  
  }

  return (
    <li className="card">
      <div className="image">
        <span className="price">$0</span>
        <img src={image} alt={"description"} />
      </div>
      <div className="details">
        {favorited ? inActiveFavButton : activeFavButton}
        <strong>{description}</strong>
        <span> · {location}</span>
        <button className="emoji-button delete" onClick={handleDelete}>
          🗑
        </button>
      </div>
    </li>
  );
}

export default ListingCard;
