import React, { useEffect,useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import withRouter from "../hooks/withRouter";
import AppRoutes from "./routes";
import Headermain from "../header";
import "./App.css";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDAMCLIrGEwAKoGUTIQNJmp4RYuxc-dwLk",
  authDomain: "portofolio-a3382.firebaseapp.com",
  databaseURL: "https://portofolio-a3382-default-rtdb.firebaseio.com",
  projectId: "portofolio-a3382",
  storageBucket: "portofolio-a3382.appspot.com",
  messagingSenderId: "77016362476",
  appId: "1:77016362476:web:d635874ea694e1590be4c9",
  measurementId: "G-WHT8JD4FG5"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);


function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}
const ScrollToTop = withRouter(_ScrollToTop);

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <ScrollToTop>
        <Headermain />
        <AppRoutes />
      </ScrollToTop>
    </Router>
  );
}
