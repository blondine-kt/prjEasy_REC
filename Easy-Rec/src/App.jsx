import { useState } from 'react';
import styles from "./assets/styles/App.module.scss"
import Header from './components/Header';
import Content from './components/Content';
import Footer from './components/Footer';

function App() {


  return (
    <div className={`${styles.app_container} d-flex flex-column `}>
     <Header/>
     <Content/> 
     <Footer/>
    </div>
  )
}

export default App