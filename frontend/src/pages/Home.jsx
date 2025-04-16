import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Info from "../components/Info";
import PrescriptionGeneratorInfo from "../components/PrescriptionGeneratorInfo";
import { FaWhatsapp, FaPhoneAlt, FaSms, FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";

function Home() {
  const handleRedirect = (type) => {
    const phoneNumber = "+919491834404";
    const emailAddress = "doconrx@gmail.com";
    
    switch (type) {
      case "whatsapp":
        window.open(`https://wa.me/${phoneNumber.replace('+', '')}`, "_blank");
        break;
      case "call":
        if (navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i)) {
          window.location.href = `tel:${phoneNumber}`;
        } else {
          toast.error("This feature is supported on mobile devices.");
        }
        break;
      case "message":
        if (navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|Windows Phone/i)) {
          window.location.href = `sms:${phoneNumber}`;
        } else {
          toast.error("This feature is supported on mobile devices.");
        }
        break;
      case "email":
        window.location.href = `mailto:${emailAddress}`;
        break;
      default:
        break;
    }
  };
  

  return (
    <div className="home-section w-full overflow-x-hidden relative">
      <Header />
      <Hero />
      <Info />
      <PrescriptionGeneratorInfo />

      {/* Floating Navigation for Icons */}
      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 space-y-4 z-50">
        <div
          onClick={() => handleRedirect("whatsapp")}
          className="w-12 h-12 bg-green-500 text-white rounded-full flex justify-center items-center cursor-pointer hover:bg-green-600 shadow-lg transition"
        >
          <FaWhatsapp size={24} />
        </div>
        <div
          onClick={() => handleRedirect("call")}
          className="w-12 h-12 bg-blue-500 text-white rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-600 shadow-lg transition"
        >
          <FaPhoneAlt size={24} />
        </div>
        <div
          onClick={() => handleRedirect("message")}
          className="w-12 h-12 bg-yellow-500 text-white rounded-full flex justify-center items-center cursor-pointer hover:bg-yellow-600 shadow-lg transition"
        >
          <FaSms size={24} />
        </div>
        <div
          onClick={() => handleRedirect("email")}
          className="w-12 h-12 bg-red-500 text-white rounded-full flex justify-center items-center cursor-pointer hover:bg-red-600 shadow-lg transition"
        >
          <FaEnvelope size={24} />
        </div>
      </div>
    </div>
  );
}

export default Home;
