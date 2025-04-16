import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./context/AuthProvider";
import DoctorRegistration from "./components/DoctorRegistration";
import Login from "./components/Login";
import Home from "./pages/Home";
import CustomFooter from "./components/CustomFooter";
import About from "./components/About";
import NotFound from "./pages/NotFound";
import DoctorDashboard from './pages/DoctorDashboard';
import CreatePrescription from './pages/CreatePrescription';
import PendingRequestPage from "./pages/PendingRequestPage";
import AdminDashboard from "./pages/AdminDashboard";
import HowItWorks from "./components/HowItWorks";
import ContactUsPage from "./components/ContactUsPage";
import TestimonialPage from "./components/TestimonialPage";


function App() {
  return (
    <div className="">
    <AuthProvider>
        <Toaster position="top-center"/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={< About/>} />
          <Route path="/howitworks" element={< HowItWorks/>} />
          <Route path="/testimonial" element={< TestimonialPage/>} />
          <Route path="/contactus" element={< ContactUsPage/>} />
          <Route path="/register" element={<DoctorRegistration />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/create-prescription" element={<CreatePrescription />} />
          <Route path="/request" element={<PendingRequestPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <CustomFooter />
    </AuthProvider>
    </div>
  );
}

export default App;
