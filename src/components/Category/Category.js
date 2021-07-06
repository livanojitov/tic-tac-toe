import React, { useContext, useMemo } from "react";
import { CategoryContext } from "../../contexts/CategoryContext";
import { DictionaryContext } from "../../contexts/DictionaryContext";
import { GameContext } from "../../contexts/GameContext";
import { changeCategory } from "../../store/game/gameActions";
import "./Category.scss";

const Category = () => {
  const { categories } = useContext(CategoryContext);
  const { dictionary } = useContext(DictionaryContext);
  const { game, dispatch } = useContext(GameContext);

  return useMemo(() => {
    return dictionary && categories ? (
      <div className="categories" data-testid="categories">
        <span data-testid="description">{dictionary.CATEGORY}: </span>
        <select
          data-testid="select"
          value={game.category.id}
          onChange={(e) => {
            dispatch(changeCategory(categories[e.target.value]));
          }}
        >
          {categories.map((category) => {
            return (
              <option
                key={category.id}
                value={category.id}
                data-testid="select-option"
              >
                {dictionary[category.name]}
              </option>
            );
          })}
        </select>
      </div>
    ) : null;
  }, [categories, dictionary, dispatch, game.category.id]);
};

export default Category;
