import React, { useContext } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";
import { DictionaryContext } from "../../contexts/DictionaryContext";
import "./Category.scss";

const Historical = ({ categoryId }) => {
  const { categories } = useContext(CategoryContext);
  const { dictionary } = useContext(DictionaryContext);

  return dictionary && categories ? (
    <div className="categories">
      <span>{dictionary.CATEGORY}: </span>
      <span>{dictionary[categories[categoryId].name]}</span>
    </div>
  ) : null;
};

export default Historical;
