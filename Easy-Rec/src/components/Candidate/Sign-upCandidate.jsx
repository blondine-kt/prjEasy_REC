import styles from "../../assets/styles/SignupCandidate.module.scss";

import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/userAuth";
import { auth } from "../../utils/firebase.utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../utils/firebase.utils";
import { doc, setDoc } from "firebase/firestore";
import { storage } from "../../utils/firebase.utils";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function SignupCandidate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    profilePicture: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({
        ...prev,
        profilePicture: file,
      }));

      // Create image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Please select a valid image file");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Create auth user
      const { user } = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      // Handle profile picture upload
      let profilePictureUrl = "";
      if (formData.profilePicture) {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, formData.profilePicture);
        profilePictureUrl = await getDownloadURL(storageRef);
      }

      // Save user data to Firestore

      await setDoc(doc(db, "candidates", user.uid), {
        uid: user.uid,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber || "",
        profilePicture: profilePictureUrl || "",
        createdAt: new Date().toISOString(),
      });

      // Navigate to dashboard
       navigate('/candidate/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.candidateSignup} d-flex p-20 flex-column justify-content-center align-items-center poppins-medium `}>
      <h2 >
        Candidate Registration
      </h2>

      {error && (
        <div className={`${styles.errors}`}>{error}</div>
      )}

      <form onSubmit={handleSubmit} className={`${styles.registrationform} flex-column`}>
        <div className="d-flex flex-column">
          <label >Email</label>
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
          <label className="block text-sm font-medium mb-1">Password</label>
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
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            required
            className={`${styles.inputs} p-10`}
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex flex-column">
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            required
            className={`${styles.inputs} p-10`}
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex flex-column">
          <label className="block text-sm font-medium mb-1">
            Phone Number 
          </label>
          <input
            type="tel"
            name="phoneNumber"
            className={`${styles.inputs} p-10`}
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex flex-column">
          <label className="block text-sm font-medium mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={`${styles.uploadinput}`}
          />
        </div>
        {imagePreview && (
          <div className={`${styles.imageContainer}`}>
            <img
              src={imagePreview}
              alt="Profile preview"
              
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`${styles.btnSubmit}`}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
        <div>
        <NavLink to="/candidate/login">
            Already have an account
        </NavLink>
        </div>
       
      </form>
    </div>
  );
}

export default SignupCandidate;
