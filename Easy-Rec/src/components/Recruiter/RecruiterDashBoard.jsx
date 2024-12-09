import React,{ useState,useContext } from 'react'
import styles from '../../assets/styles/DashBoardRecruiter.module.scss';
import SubscriptionPlansRec from '../AbonnementRec';
import Offres from './Offres';
import FloatingChatbot from '../Chat';
import InfoList from './ShowOffres';
import { useAuth } from '../../context/userAuth';
import AbonnementContext from "../../context/abonnementContext";
import { useNavigate, NavLink } from "react-router-dom";


function RecruiterDashBoard() {
  const { user, logout } = useAuth()
  const { abonnement, setAbonnement } = useContext(AbonnementContext)
  const navigate = useNavigate()

  const handleLogout= ()=>{
    setAbonnement(null)
    logout({
      ...null,
      type:'recruiter'
    })
    navigate('/')
  }


  

  
  return (
    <div className={`${styles.dashboard_body} p-20`}>
    <div className='p-10 d-flex flex-row poppins-semibold justify-content-between'>
    <h2>RecruiterDashBoard</h2>
    <button className={`${styles.btnDisconnect}`} onClick={handleLogout}>Deconnexion</button>
    </div>
   

    
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
    
    {abonnement.forfait == 'Enterprise' ? 
      <div>
     <FloatingChatbot/>
     </div>
     : <div></div>}
    

     
    </div>
  )
}

export default RecruiterDashBoard