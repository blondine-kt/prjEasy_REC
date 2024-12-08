import React, { useState } from "react";
import AbonnementContext from "./abonnementContext"; // Import the context you created

const AbonnementProvider = ({ children }) => {
  // Initialize the state
  const [abonnement, setAbonnement] = useState(null);

  return (
    <AbonnementContext.Provider value={{ abonnement, setAbonnement }}>
      {children}
    </AbonnementContext.Provider>
  );
};

export default AbonnementProvider;
