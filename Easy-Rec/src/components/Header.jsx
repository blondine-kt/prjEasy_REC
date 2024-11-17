import React from "react";
import styles from "../assets/styles/Header.module.scss";

function Header() {
  return (
    <div
      className={`${styles.header_container} d-flex flex-row align-items-center`}
    >
      <img src="../../assets/images/fv_icon.png" alt="FastVoiture icon" />

      <div>
        <ul>
          <li>Connexion</li>
          <li>Inscription</li>
        </ul>
      </div>
    </div>
  );
}

export default Header;