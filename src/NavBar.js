import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "./helpers/LanguageContext";
import { RouteBuilder } from "./helpers/Helpers_Routing";

const NavBar = (props) => {
  const paths = props.paths;
  const { currentLanguage, changeLanguage } = useContext(LanguageContext);
  const handleLanguageChange = (language) => {
    changeLanguage(language);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-background">
      <div className="container">
        <Link className="navbar-brand" to="/">
          School Trainer
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            {RouteBuilder(paths)}

            <li className="nav-item nav-language" key="language">
              <div>
                <select
                  value={currentLanguage}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  <option value="it">Italian</option>
                  <option value="en">English</option>
                  <option value="zh">中文</option>
                </select>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
