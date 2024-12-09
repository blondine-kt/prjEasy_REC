import React, { useState,useContext } from "react";
import styles from "../../assets/styles/SignupRecruiter.module.scss";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/userAuth";
import { auth } from "../../utils/firebase.utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../utils/firebase.utils";
import { doc, setDoc } from "firebase/firestore";
import { storage } from "../../utils/firebase.utils";
import Api from "../../context/Apicontext";

function SignupRecruiter() {
  const{SOURCE} = useContext(Api)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom_entreprise:"", 
    email:"",
    password:"",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Create auth user
      // const { user } = await createUserWithEmailAndPassword(
      //   auth,
      //   formData.email,
      //   formData.password
      // );

      // // Save user data to Firestore

      // await setDoc(doc(db, "recruiters", user.uid), {
      //   uid: user.uid,
      //   email: formData.email,
      //   companyName: formData.companyName,
      //   phoneNumber: formData.phoneNumber,

      //   createdAt: new Date().toISOString(),
      // });

      const response= await fetch(`${SOURCE}/register_recruteur`, {

        method:"POST",
        
        headers:{"Content-Type":"application/json"},
        
        body:JSON.stringify(formData),
        });
        const data= await response.json()
        console.log('reponse:',data)

      // Navigate to dashboard
      navigate("/recruiter/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`${styles.recruiterSignup} d-flex p-20 flex-column justify-content-center align-items-center`}
    >
      <h2>Recruiter Registration</h2>

      {error && <div className={`${styles.errors}`}>{error}</div>}

      <form
        onSubmit={handleSubmit}
        className={`${styles.registrationform} flex-column`}
      >
        <div className="d-flex flex-column">
          <label>Email</label>
          <input
            type="email"
            name="email"
            required
            className={`${styles.inputs} p-10`}
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex flex-column">
          <label>Password</label>
          <input
            type="password"
            name="password"
            required
            minLength={6}
            className={`${styles.inputs} p-10`}
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex flex-column">
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <input
            type="text"
            name="nom_entreprise"
            required
            className={`${styles.inputs} p-10`}
            value={formData.nom_entreprise}
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`${styles.btnSubmit}`}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
        <div>
          <NavLink to="/recruiter/login" className={`${styles.hypertext}`}>Already have an account</NavLink>
        </div>
      </form>
    </div>
  );
}

export default SignupRecruiter;
