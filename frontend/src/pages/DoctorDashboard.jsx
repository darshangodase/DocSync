import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DoctorDashboardSidebar from "../components/DoctorDashboardSidebar";
import Profile from "../components/Profile";
import AllPrescriptions from "../components/Prescription_All";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DrugBee from "../components/DrugBee";
import toast from "react-hot-toast";
import { Spinner } from "flowbite-react";
import AdminMessage from "../components/AdminMessage";
import { useSelector } from "react-redux";
import MedicalReport from "../pages/MedicalReport";
import FitnessReport from "../pages/FitnessReport";
import AllCertificates from "../components/AllCertificates";


function DoctorDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, settab] = useState();

  const user = useSelector((state) => state.user.user); 
  const loading = useSelector((state) => state.user.loading);
  
  const [localLoading, setLocalLoading] = useState(true); 

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (us) => {
      if (!us) {
        navigate("/login"); // Redirect if the user is not authenticated
      } else if (user?.role === "admin") {
        toast.error("Access denied");
        navigate("/"); // Redirect if the role is invalid
      }

      setLocalLoading(false); // Authentication checks are complete
    });

    return () => unsubscribe();
  }, [navigate, user]);

  useEffect(() => {
    const urlparams = new URLSearchParams(location.search);
    const tabformurl = urlparams.get("tab");
    if (tabformurl) {
      settab(tabformurl);
    }
  }, [location.search]);

  // Show a loading spinner or fallback UI while validation is in progress
  if (loading || localLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden">
      <div className="md:w-56">
        <DoctorDashboardSidebar />
      </div>
      <div className="flex-1 flex justify-center items-center overflow-x-auto">
        {tab === "AdminMessage" && <AdminMessage />}
        {tab === "profile" && <Profile />}
        {tab === "prescriptions" && <AllPrescriptions />}
        {tab === "drugbee" && <DrugBee />}
        {tab === "medicalform" && <MedicalReport />}
        {tab === "fitnessform" && <FitnessReport />}
        {tab === "certificates" && <AllCertificates />}
      </div>
    </div>
  );
}

export default DoctorDashboard;
