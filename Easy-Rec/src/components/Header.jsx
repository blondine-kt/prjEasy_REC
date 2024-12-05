import React from "react";
import styles from "../assets/styles/Header.module.scss";
import { Navigate, NavLink,useNavigate } from "react-router-dom";

function Header() {

  const navigate = useNavigate();
  return (
    <div
      className={`${styles.header_container} d-flex flex-row align-items-center`}
      onClick={() => navigate("/")}
    >
      <img src="../../assets/images/prjEasy_RecLogo.png" alt="FastVoiture icon" />

      <div>
      </div>
    </div>
  );
}

export default Header;