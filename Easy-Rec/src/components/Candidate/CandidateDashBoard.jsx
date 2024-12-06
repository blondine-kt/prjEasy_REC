import React, { useState, useRef, useContext } from "react";
import { useAuth } from "../../context/userAuth";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/styles/DashboardCandidate.module.scss";
import SubscriptionPlans from "../Abonnement";
import Api from "../../context/Apicontext";

function CandidateDashBoard() {
  const{SOURCE} = useContext(Api)
  const { user } = useAuth();

  const[selectedFile, setSelectedFile] = useState(null)
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
        formData.append(file)

        const response= await fetch(`${SOURCE}/upload_cv`, {
    
          method:"POST",
          
          body:file,
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
 

  

  return (
    <div className={`${styles.dashboard_body} p-20 `}>
      <h1>Welcome to Candidate Dashboard</h1>
      <p>Hello, {user.name} {user.surname}!</p>
      <div className="p-20"><SubscriptionPlans/></div>
      
      <hr/>
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



      
    </div>
  );
}

export default CandidateDashBoard;
