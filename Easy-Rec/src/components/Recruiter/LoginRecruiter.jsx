import React,{useEffect,useContext, useState} from 'react'
import Api from "../../context/Apicontext";
import { useAuth } from "../../context/userAuth";
import { useNavigate, NavLink } from "react-router-dom";
import styles from "../../assets/styles/SignupRecruiter.module.scss";



function LoginRecruiter() {
 

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const{SOURCE}=useContext(Api) 

  useEffect(() => {
    if (user) {
      navigate("/recruiter/dashboard");
    }
  }, [user, navigate]);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // // First authenticate with Firebase
      // const userCredential = await signInWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );
      // if (userCredential) {
      //   const aUser = userCredential.user;
      //   console.log(aUser);
      // } else {
      //   console.log("None");
      // }

      // const candidateData = await getCandidateInfo(userCredential.user.uid);
      const info = {email:email,password:password}
      const response= await fetch(`${SOURCE}/log_recruteur`, {
  
        method:"POST",
        
        headers:{"Content-Type":"application/json"},
        
        body:JSON.stringify(info),
        });
        const data= await response.json()
        console.log(data)
        if(data){
          const recruiter= data.message
          const recruiterData = {
            company_id: recruiter.recruteur_id ,
            company_name: recruiter.nom_entreprise,
        
          };
          console.log(recruiterData)
  
  
        login({
          ...recruiterData,
          type: "recruiter",
        });
        }
        
      
    } catch (error) {
      console.log("Login failed:", error);
    }
  };


  

  return (
    <>
    <main>
      <section
        className={`${styles.recruiterSignup} d-flex p-20 flex-column justify-content-center align-items-center poppins-medium `}
      >
        <div >
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
            No account yet? <NavLink to="/recruiter/signup">Sign up</NavLink>
          </p>
        </div>
      </section>
    </main>
  </>
  )
}

export default LoginRecruiter