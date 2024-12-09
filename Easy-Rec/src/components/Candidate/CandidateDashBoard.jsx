import React, { useState, useRef, useContext } from "react";
import { useAuth } from "../../context/userAuth";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/styles/DashboardCandidate.module.scss";
import SubscriptionPlans from "../Abonnement";
import Api from "../../context/Apicontext";
import FloatingChatbot from "../Chat";
import JobListings from "./JobPostings";
import AbonnementContext from "../../context/abonnementContext";
 


function CandidateDashBoard() {
  const{SOURCE} = useContext(Api)
  const { user, logout } = useAuth();
  const { abonnement, setAbonnement } = useContext(AbonnementContext)
 const navigate = useNavigate();

  const[visible, setVisible]= useState(false)

 
  const inputRef = useRef(null);
  const[fileName,setFileName] = useState('Aucun fichiers Televerser')

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if(file){
      setFileName(file.name);
      handleUpload(file)
    }
    
   
  };

  const handleUpload = async (file) => {

    try{
        const formData = new FormData
        formData.append('file',file)
        formData.append('candidat_id', String(user.candidateId))
        

        const response= await fetch(`${SOURCE}/upload_cv`, {
    
          method:"POST",
          
          body:formData,
          });
           const data= await response.json()
           console.log('reponse:',data)

    }
    catch(error){
      console.log(error)
    }
  
  } 

  const handleButtonClick = () => {
    inputRef.current?.click();
  };
  const handleLogout= ()=>{
    setAbonnement(null)
    logout({
      ...null,
      type:'candidate'
    })
    navigate('/')
  }

  const handleVisible =() =>{

  }
 

  

  return (
    <div className={`${styles.dashboard_body} p-20 `}>
     <div className="poppins-bold p-10 d-flex flex-row justify-content-between">
      <h1>Welcome to Candidate Dashboard</h1>
      <button className={`${styles.btnDisconnect}`} onClick={handleLogout}>Deconnexion</button>
      </div>
      <p>Hello, {user.name} {user.surname}!</p>

      {abonnement ? <div><p>Abonnement : {abonnement.forfait}</p>
      <p>Validite : {abonnement.debut} - {abonnement.fin}</p></div>: 
      <div className="p-20"><SubscriptionPlans/></div>
      }
      <hr/>
      { user.cv ? <div></div> :
      <div className={`${styles.btnUpload} d-flex justify-content-center align-items-center p-20`}>
      <div className={`${styles.file_input_wrapper}`}>
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        className={`${styles.file_input}`}
        id="file-input"
        aria-label="File input"
      />
      <button
        onClick={handleButtonClick}
        className={`${styles.file_button}`}
      >
        Choose a file
      </button>
      
      <span className={`${styles.file_name}`}>
        {fileName}
      </span>
      </div>
      
      </div>
      }
     
      
      <div>
       <JobListings />
      </div>
     {abonnement &&
     abonnement.forfait == 'Enterprise' ? 
      <div>
     <FloatingChatbot/>
     </div>
     : <div></div>}
     
    </div>
     
  );
}

export default CandidateDashBoard;
