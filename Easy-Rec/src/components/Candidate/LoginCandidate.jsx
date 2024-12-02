import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/userAuth";
import { useNavigate, NavLink } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/firebase.utils";
import { db } from "../../utils/firebase.utils";
import { doc, getDoc } from "firebase/firestore";
import styles from "../../assets/styles/SignupCandidate.module.scss";

function LoginCandidate() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/candidate/dashboard");
    }
  }, [user, navigate]);

  

  const getCandidateInfo = async (uid) => {
    try {
      const candidateRef = doc(db, "candidates", uid);
      const candidateSnap = await getDoc(candidateRef);

      if (candidateSnap.exists()) {
        return candidateSnap.data();
      } else {
        throw new Error("No candidate found with this ID");
      }
    } catch (error) {
      console.error("Error fetching candidate data:", error);
      throw error;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // First authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        const aUser = userCredential.user;
        console.log(aUser);
      } else {
        console.log("None");
      }

      const candidateData = await getCandidateInfo(userCredential.user.uid);

      login({
        ...candidateData,
        type: "candidate",
      });
      console.log(candidateData);
    } catch (error) {
      console.log("Login failed:", error);
    }
  };

  return (
    <>
      <main>
        <section
          className={`${styles.candidateSignup} d-flex p-20 flex-column justify-content-center align-items-center poppins-medium `}
        >
          <div>
            <form onSubmit={handleLogin} className={`${styles.registrationform} flex-column`}>
              <div className="d-flex flex-column">
                <label htmlFor="email-address">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                  className={`${styles.inputs} p-10`}
                />
              </div>

              <div className="d-flex flex-column">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className={`${styles.inputs} p-10`}
                />
              </div>

              <div className="d-flex flex-column">
                <button type="submit" className={`${styles.btnSubmit}`}>
                  Login
                </button>
              </div>
            </form>

            <p className="text-sm text-white text-center">
              No account yet? <NavLink to="/candidate/signup">Sign up</NavLink>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
export default LoginCandidate;
