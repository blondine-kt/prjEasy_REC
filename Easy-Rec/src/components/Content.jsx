import React from "react";
import styles from "../assets/styles/Content.module.scss";
import { Navigate, NavLink,useNavigate } from "react-router-dom";


function Content() {

  const navigate = useNavigate();

  return (
    <div className={`${styles.content} container parallax p-30`}>
    <div className={` d-flex flex-column`}>
    <div className={` ${styles.paragraph} p-30 ml-20 `}>
          <h2>Pourquoi EASY.REC ? </h2>
          <p>
          Bienvenue sur Easy.Rec, la plateforme de recrutement pensée pour simplifier la mise en relation entre candidats et recruteurs.
           Que vous soyez à la recherche de votre prochain défi professionnel ou en quête de talents pour renforcer votre équipe, Easy.
           Rec vous offre un environnement intuitif, rapide et efficace pour répondre à vos besoins. 
           Candidats, découvrez une large gamme d’opportunités adaptées à votre profil et à vos ambitions.
            Recruteurs, accédez à une base de données de candidats qualifiés et simplifiez vos processus de recrutement.
            Avec Easy.Rec, trouver ou décrocher un emploi devient plus facile que jamais.
          </p>
        </div>
        <div className={`d-flex flex-row my-30 justify-content-between align-items-center`}>
        <div className={`${styles.card}`}>
        <div className={`${styles.box}`}>
        <img src="../assets/images/jobseeker.png" alt="Job seeker" />
        </div>
        <div className={`${styles.logocontainer}`} onClick={() => navigate("/candidate/signup")}>
        <img src="../assets/images/candidat.png" alt="Job seeker" className={`${styles.logo}`}/>
        </div>
        </div>
        <div className={`${styles.card}`}>
        <div className={`${styles.box}`} >
        <img src="../assets/images/recruiter.png" alt="Recruiter" />

        </div>
        <div className={`${styles.logocontainer}`} onClick={() => navigate("/recruiter/signup")}>
        <img src="../assets/images/recruiteur.png" alt="Job seeker" className={`${styles.logo}`}/>
        </div>
        </div>
        
        </div>
    </div>
      Content
    </div>
  );
}

export default Content;