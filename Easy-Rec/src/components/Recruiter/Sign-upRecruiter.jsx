import React, { useState } from "react";
import styles from "../../assets/styles/SignupRecruiter.module.scss";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/userAuth";
import { auth } from "../../utils/firebase.utils";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../utils/firebase.utils";
import { doc, setDoc } from "firebase/firestore";
import { storage } from "../../utils/firebase.utils";

function SignupRecruiter() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    companyName: "",
    forfait: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    {
      id: "option1",
      label: "Option 1",
      description: "Description for option 1",
    },
    {
      id: "option2",
      label: "Option 2",
      description: "Description for option 2",
    },
    {
      id: "option3",
      label: "Option 3",
      description: "Description for option 3",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleOptionChange = (value) => {
    setSelectedOption(value);
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

      // Save user data to Firestore

      await setDoc(doc(db, "recruiters", user.uid), {
        uid: user.uid,
        email: formData.email,
        companyName: formData.companyName,
        forfait: selectedOption,
        phoneNumber: formData.phoneNumber,

        createdAt: new Date().toISOString(),
      });

      // Navigate to dashboard
      navigate("/candidate/dashboard");
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
          <label className="block text-sm font-medium mb-1">Company Name</label>
          <input
            type="text"
            name="firstName"
            required
            className={`${styles.inputs} p-10`}
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>
        <div className="d-flex flex-column">
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            name="phoneNumber"
            className={`${styles.inputs} p-10`}
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div className={`${styles.radio_container} d-flex flex-row `}>
          {options.map((option) => (
            <div key={option.value} className={`${styles.radio_item}`}>
              <input
                type="radio"
                id={option.value}
                name="radio-group"
                value={option.value}
                checked={selectedOption === option.value}
                onChange={() => handleOptionChange(option.value)}
                className={`${styles.radio_input}`}
              />
              <label htmlFor={option.value} className={`${styles.radio_label}`}>
                <span className={`${styles.radio_circle}`}></span>
                <div className={`${styles.radio_content}`}>
                  <span className={`${styles.radio_title}`}>
                    {option.label}
                  </span>
                  {option.description && (
                    <span className={`${styles.radio_description}`}>
                      {option.description}
                    </span>
                  )}
                </div>
              </label>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`${styles.btnSubmit}`}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
        <div>
          <NavLink to="/candidate/login">Already have an account</NavLink>
        </div>
      </form>
    </div>
  );
}

export default SignupRecruiter;
