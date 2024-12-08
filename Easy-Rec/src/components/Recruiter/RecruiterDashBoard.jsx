import React,{ useState,useContext } from 'react'
import styles from '../../assets/styles/DashBoardRecruiter.module.scss';
import SubscriptionPlansRec from '../AbonnementRec';
import Offres from './Offres';
import FloatingChatbot from '../Chat';
import InfoList from './ShowOffres';
import { useAuth } from '../../context/userAuth';
import AbonnementContext from "../../context/abonnementContext";


function RecruiterDashBoard() {
  const { user } = useAuth()
  const { abonnement } = useContext(AbonnementContext)
  

  
  return (
    <div className={`${styles.dashboard_body} p-20`}>
    <h2>RecruiterDashBoard</h2>
    {abonnement ? <div><p>Abonnement : {abonnement.forfait}</p>
    <p>Duree : {abonnement.debut} - {abonnement.fin}</p></div>: 
    <div className='p-20'>
    <SubscriptionPlansRec/>
    </div>
    }
   
    <hr/>
    <div className='p-20 d-flex flex-row'>
    <div>
      <Offres/>
    </div>
    <InfoList/>
    </div>
    
    <FloatingChatbot/>
    

     
    </div>
  )
}

export default RecruiterDashBoard