import { useState, useEffect } from 'react';
import styles from "./assets/styles/App.module.scss"
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';
import SignupCandidate from './components/Candidate/Sign-upCandidate';
import SignupRecruiter from './components/Recruiter/Sign-upRecruiter';
import LoginRecruiter from './components/Recruiter/LoginRecruiter';
import LoginCandidate from './components/Candidate/LoginCandidate';
import CandidateDashBoard from './components/Candidate/CandidateDashBoard';
import RecruiterDashBoard from './components/Recruiter/RecruiterDashBoard';
import { AuthProvider } from './context/usercontext';
import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AbonnementProvider from './context/AbonnementProvider';

import { PayPalScriptProvider } from "@paypal/react-paypal-js";


function App() {
  const initialOptions = {
    "client-id":"AfKALFn73Jm7HlCXf5WkSYWwhlD-o2OIKMaFVavQHQBB0g3a7LUR3pLXlAoMdWymzv8O4Hci8RaQMlGe",
    currency: "USD",
    intent: "capture",
  };
  
  


  return (
    <PayPalScriptProvider options={initialOptions}>
    <AuthProvider>
    <AbonnementProvider>
    <Router>
    <div className={`${styles.app_container} d-flex flex-column `}>
     <Header/>
     <main>
     
     <Routes>
     <Route path='/' element={<Content/> }/>
     <Route path="/candidate">
              <Route path="signup" element={<SignupCandidate />} />
              <Route path="login" element={<LoginCandidate />} />
              <Route 
                  path="dashboard" 
                  element={
                    <ProtectedRoute userType="candidate">
                      <CandidateDashBoard/>
                    </ProtectedRoute>
                    } />
            </Route>
     <Route path="/recruiter">
              <Route path="signup" element={<SignupRecruiter />} />
              <Route path="login" element={<LoginRecruiter />} />
              <Route 
                  path="dashboard" 
                  element={
                    <ProtectedRoute userType="recruiter">
                      <RecruiterDashBoard />
                    </ProtectedRoute>
                  } 
                />
            </Route>
     </Routes>
     
     </main>
     <Footer/>
    </div>
    </Router>
    </AbonnementProvider>
    </AuthProvider>
    </PayPalScriptProvider>
  )
}

export default App