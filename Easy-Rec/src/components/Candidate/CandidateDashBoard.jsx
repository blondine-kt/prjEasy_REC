import React from "react";
import { useAuth } from "../../context/userAuth";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/styles/DashboardCandidate.module.scss";
import SubscriptionPlans from "../Abonnement";

function CandidateDashBoard() {
  const { user } = useAuth();

  return (
    <div className={`${styles.dashboard_body} p-20 `}>
      <h1>Welcome to Candidate Dashboard</h1>
      <p>Hello, {user.name} {user.surname}!</p>
      <SubscriptionPlans/>
      <hr/>
      <div>
        <input type="file" name="cv" />
      </div>



      
    </div>
  );
}

export default CandidateDashBoard;
