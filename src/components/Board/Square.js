import React from "react";
import PropTypes from "prop-types";
import "./Board.scss";

const Square = React.memo(({ disabled, id, image, win }) => {
  const firebaseUrl = `url(https://firebasestorage.googleapis.com/v0/b/puzzle-ebd10.appspot.com/o/images%2F${image}.jpg?alt=media)`;

  return (
    <button
      className={win}
      data-testid="square"
      disabled={disabled}
      id={id}
      style={{ backgroundImage: firebaseUrl }}
    ></button>
  );
});

Square.propTypes = {
  disabled: PropTypes.bool,
  id: PropTypes.number,
  image: PropTypes.string,
  win: PropTypes.string,
};

export default Square;
