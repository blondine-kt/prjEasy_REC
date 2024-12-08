import React, { useState, useContext } from "react";
import { useAuth } from "../../context/userAuth";
import Api from "../../context/Apicontext";
import styles from '../../assets/styles/ShowOffres.module.scss'

const InfoList = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const { user } = useAuth();
  const { SOURCE } = useContext(Api);

  const allOffers = async () => {
    try {
      
      const recruteurs_id={recruteurs_id:String(user.company_id)};
      const response = await fetch(`${SOURCE}/get_offre_by_idRecruteur`, {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body:JSON.stringify(recruteurs_id),
      });
      const data = await response.json();
      if(data){
        console.log("reponse:", data);
        setIsVisible(!isVisible)
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  // Sample data - replace with your actual API response
  const infoArray = [
    {
      id: 1,
      title: "First Information",
      description: "This is the description for the first item",
      details: "More detailed information about the first item goes here",
    },
    {
      id: 2,
      title: "Second Information",
      description: "This is the description for the second item",
      details: "More detailed information about the second item goes here",
    },
    {
      id: 3,
      title: "Third Information",
      description: "This is the description for the third item",
      details: "More detailed information about the third item goes here",
    },
  ];

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
      padding: "10px 20px",
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
    <div style={`${styles.container}`}>
      <button
        style={`${styles.toggleButton}`}
        onClick={allOffers}
      >
        {isVisible ? "Cacher Les Offres" : "Voir les Offres"}
      </button>

      <div style={styles.infoList}>
        {infoArray.map((info) => (
          <div key={info.id} style={styles.infoItem}>
            <div style={styles.title} onClick={() => handleItemClick(info.id)}>
              {info.title}
              <span
                style={{
                  ...styles.arrow,
                  transform:
                    expandedId === info.id ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                ▼
              </span>
            </div>

            {expandedId === info.id && (
              <div style={styles.content}>
                <div style={styles.description}>{info.description}</div>
                <div style={styles.details}>{info.details}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoList;
