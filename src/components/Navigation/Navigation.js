import React, { useContext, useRef } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { DictionaryContext } from "../../contexts/DictionaryContext";
import "./Navigation.scss";

const Navigation = ({ renderCheckbox }) => {
  const { dictionary } = useContext(DictionaryContext);
  const inputRef = useRef(null);

  function collapseMobileMenu() {
    if (inputRef.current) {
      inputRef.current.checked = false;
    }
  }

  return dictionary ? (
    <nav>
      {renderCheckbox && (
        <input
          data-testid="mobile-menu-chk"
          type="checkbox"
          id="menu"
          ref={inputRef}
        />
      )}
      <label className="mylabel" htmlFor="menu">
        <div id="burger-container">
          <div id="burger">
            <span>&nbsp;</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
          </div>
        </div>
      </label>
      <ul data-testid="nav" className="nav" onClick={collapseMobileMenu}>
        <li key="0">
          <NavLink data-testid="game" exact to={"/"}>
            {dictionary.GAME}{" "}
          </NavLink>
        </li>
        <li key="1">
          <NavLink data-testid="historical" exact to={"/historical"}>
            {dictionary.HISTORY}{" "}
          </NavLink>
        </li>
        <li key="2">
          <NavLink data-testid="repository" exact to={"/repository"}>
            {dictionary.REPOSITORY}
          </NavLink>
        </li>
        <li key="3">
          <NavLink data-testid="about" exact to={"/about"}>
            {dictionary.ABOUT}{" "}
          </NavLink>
        </li>
        <li key="4">
          <NavLink data-testid="contact" exact to={"/contact"}>
            {dictionary.CONTACT}{" "}
          </NavLink>
        </li>
      </ul>
    </nav>
  ) : null;
};

Navigation.defaultProps = {
  renderCheckbox: true,
};

Navigation.propTypes = {
  renderCheckbox: PropTypes.bool,
};

export default Navigation;
