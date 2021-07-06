import React, { useContext, useEffect, useMemo } from "react";
import { DictionaryContext } from "../../contexts/DictionaryContext";
import { GameContext } from "../../contexts/GameContext";
import { changeImages } from "../../store/game/gameActions";
import useImages from "../../hooks/useImages";
import "./Images.scss";

const Images = () => {
  const { dictionary } = useContext(DictionaryContext);
  const { game, dispatch } = useContext(GameContext);
  const folder = game.category.folder;

  const url =
    "https://firebasestorage.googleapis.com/v0/b/puzzle-ebd10.appspot.com/o/images";
  const { images, refreshImage } = useImages(
    game.images.user,
    game.images.computer
  );
  const { user: imageUser, computer: imageComputer } = images;

  useEffect(() => {
    dispatch(
      changeImages({
        user: imageUser,
        computer: imageComputer,
      })
    );
  }, [imageUser, imageComputer, dispatch]);

  return useMemo(() => {
    return dictionary && folder ? (
      <div className="images" data-testid="images">
        <div className="user-image">
          <span>{dictionary.YOU}: </span>
          <img
            className="image-token"
            src={`${url}%2F${folder}%2F${imageUser}.jpg?alt=media`}
            alt="user"
            title={dictionary.USER_IMAGE_TOOLTIP}
          />
          <img
            className="refresh"
            id="user"
            src={`${url}%2Frefresh.png?alt=media`}
            alt="refresh"
            onClick={(e) => refreshImage(e)}
            title={dictionary.REFRESH_TOOLTIP}
            data-testid="user-image"
          />
        </div>

        <div className="computer-image">
          <span>{dictionary.OPPONENT}: </span>
          <img
            className="image-token"
            src={`${url}%2F${folder}%2F${imageComputer}.jpg?alt=media`}
            alt="computer"
            title={dictionary.COMPUTER_IMAGE_TOOLTIP}
          />
          <img
            className="refresh"
            id="computer"
            src={`${url}%2Frefresh.png?alt=media`}
            alt="refresh"
            onClick={(e) => refreshImage(e)}
            title={dictionary.REFRESH_TOOLTIP}
            data-testid="computer-image"
          />
        </div>
      </div>
    ) : null;
  }, [dictionary, imageUser, imageComputer, refreshImage, folder]);
};

export default Images;
