import React, { useState, useContext } from "react";
import { useAuth } from "../../context/userAuth";
import Api from "../../context/Apicontext";


const InfoList = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const { user } = useAuth();
  const { SOURCE } = useContext(Api);
  const [ offers, setOffers ]= useState([])

  const allOffers = async () => {
    try {
      
      const recruteurs_id={recruteurs_id:String(user.company_id)};
      const response = await fetch(`${SOURCE}/get_offre_by_idRecruteur`, {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body:JSON.stringify(recruteurs_id),
      });
      const data = await response.json();
      setOffers(data.message)
      if(data){
        console.log("reponse:", data);
        setIsVisible(!isVisible)
        console.log(offers)
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleItemClick = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const styles = {
    container: {
      maxWidth: "800px",
      margin: "20px auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    toggleButton: {
      padding: "15px 20px",
      backgroundColor: "#a0eaf2",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      marginBottom: "20px",
      transition: "background-color 0.2s",
    },
    infoList: {
      display: isVisible ? "block" : "none",
      borderRadius: "8px",
      overflow: "hidden",
      border: "1px solid #e5e7eb",
    },
    infoItem: {
      borderBottom: "1px solid #e5e7eb",
      transition: "background-color 0.2s",
    },
    title: {
      padding: "15px 20px",
      backgroundColor: "#f8fafc",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontWeight: "500",
    },
    content: {
      padding: "20px",
      backgroundColor: "white",
      borderTop: "1px solid #e5e7eb",
      overflow:"scroll"
    },
    description: {
      marginBottom: "10px",
      color: "#4b5563",
    },
    details: {
      color: "#6b7280",
      fontSize: "0.95em",
    },
    arrow: {
      transition: "transform 0.2s",
    },
  };

  return (
    <div style={styles.container}>
      <button
        style={styles.toggleButton}
        onClick={allOffers}
      >
        {isVisible ? "Cacher Les Offres" : "Voir les Offres"}
      </button>

      <div style={styles.infoList}>
        {offers.map((offer,index) => (
          <div key={index} style={styles.infoItem}>
            <div style={styles.title} onClick={() => handleItemClick(index)}>
              {offer.titre}
              <span
                style={{
                  ...styles.arrow,
                  transform:
                    expandedId === index ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                ▼
              </span>
            </div>

            {expandedId === index && (
              <div style={styles.content}>
               <div style={styles.details}><strong> Salaire: {offer.salaire} </strong></div>
                <div style={styles.description}> Competences:{offer.competences}</div>
                <div style={styles.description}>Descriptions: {offer.description}</div>
                <div style={styles.description}>Candidats: {offer.cv}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoList;
