import React,{ useState } from 'react'
import styles from '../../assets/styles/DashBoardRecruiter.module.scss';
import SubscriptionPlansRec from '../AbonnementRec';
import Offres from './Offres';
function RecruiterDashBoard() {

  

  
  return (
    <div className={`${styles.dashboard_body} p-20`}>
    <h2>RecruiterDashBoard</h2>
    <div className='p-20'>
    <SubscriptionPlansRec/>
    </div>
   
    <hr/>
    <div>
      <Offres/>
    </div>
    

     
    </div>
  )
}

export default RecruiterDashBoard