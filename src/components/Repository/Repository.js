import React, { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";
import { GameContext } from "../../contexts/GameContext";
import Category from "../Category/Category";
import "./Repository.scss";

const Repository = () => {
  const { categories } = useContext(CategoryContext);
  const { game } = useContext(GameContext);
  const folder = game.category.folder;
  const url =
    "https://firebasestorage.googleapis.com/v0/b/puzzle-ebd10.appspot.com/o/images";

  return categories ? (
    <div className="repository" data-testid="repository">
      <Category />
      <div className="repository-images" data-testid="images">
        {Array(~~20)
          .fill(1)
          .map((value, index) => {
            return (
              <div key={index}>
                <img
                  src={`${url}%2F${folder}%2F${index}.jpg?alt=media`}
                  alt="user"
                  data-testid="image"
                />
              </div>
            );
          })}
      </div>
    </div>
  ) : (
    <div className="loading" data-testid="loading">
      Loading the Repository page...
    </div>
  );
};

export default Repository;
