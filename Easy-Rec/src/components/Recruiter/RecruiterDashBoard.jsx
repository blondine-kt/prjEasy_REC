import React,{ useState } from 'react'
import styles from '../../assets/styles/DashBoardRecruiter.module.scss';
import SubscriptionPlansRec from '../AbonnementRec';

function RecruiterDashBoard() {

  

  
  return (
    <div className={`${styles.dashboard_body} p-20`}>
    <h2>RecruiterDashBoard</h2>
    <SubscriptionPlansRec/>
    <hr/>

     
    </div>
  )
}

export default RecruiterDashBoard