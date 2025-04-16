import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarCheck, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useSelector } from "react-redux"; // Redux hook to get user state
import toast from "react-hot-toast";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import HeroVideo from "../assets/hero.mp4";

function Hero() {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const user = useSelector((state) => state.user.user); // Get user from Redux
  const navigate = useNavigate();

  const [goUp, setGoUp] = useState(false);
  const [prescriptionsCount, setPrescriptionsCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [countriesCount, setCountriesCount] = useState(0); // State for countries count
  const db = getFirestore();

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle 'Get Started' click
  const handleGetStartedClick = () => {
    if (currentUser) {
      if (user?.role === "doctor") {
        navigate(`/doctor/dashboard?tab=profile`);
      } else {
        toast.error("Only doctors can access this feature.");
      }
    } else {
      navigate("/login");
    }
  };

  // Fetch data from Firebase Firestore
  const fetchCounts = async () => {
    const prescriptionsRef = collection(db, "prescriptions");
    const doctorsRef = collection(db, "users");

    // Count prescriptions
    const prescriptionsSnapshot = await getDocs(prescriptionsRef);
    setPrescriptionsCount(prescriptionsSnapshot.size);

    // Count verified doctors (assuming role: "doctor" and status: "approved")
    const doctorsQuery = query(
      doctorsRef,
      where("role", "==", "doctor"),
      where("status", "==", "approved")
    );
    const doctorsSnapshot = await getDocs(doctorsQuery);

    setDoctorsCount(doctorsSnapshot.size);

    // Calculate unique countries
    const countries = new Set();
    doctorsSnapshot.forEach((doc) => {
      const doctorData = doc.data();
      if (doctorData.country) {
        countries.add(doctorData.country);
      }
    });

    setCountriesCount(countries.size); // Set the unique countries count
  };

  useEffect(() => {
    // Fetch counts when component mounts
    fetchCounts();

    const onPageScroll = () => {
      if (window.scrollY > 100) {
        setGoUp(true);
      } else {
        setGoUp(false);
      }
    };
    window.addEventListener("scroll", onPageScroll);

    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <div
      className="bg-gradient-to-r from-blue-100 to-blue-50 py-12 lg:min-h-screen"
      id="hero"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-8 px-4">
        {/* Text Section */}
        <div className="md:w-3/6 text-center md:text-left lg:ml-20">
          <p className="text-xl font-semibold text-gray-600 font-rubik">
            🩺 Revolutionize Your Prescription Experience
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 mt-4 font-poppins">
            Consult Verified Doctors & Manage Prescriptions Easily
          </h2>
          <p className="text-md sm:text-lg text-gray-600 mt-6 font-rubik">
            Welcome to DocSync, your trusted partner in creating, managing, and
            sharing prescriptions online. Designed specifically for doctors, our
            platform simplifies the prescription process, ensuring better
            communication between healthcare professionals and patients. Say
            goodbye to illegible handwritten notes and hello to clear,
            multilingual prescriptions that everyone can understand.
          </p>
          <button
            onClick={handleGetStartedClick}
            className="mt-8 sm:px-6 sm:py-3 px-4 py-2 text-white bg-blue-600 hover:bg-white hover:text-black hover:border border-blue-600 rounded-full text-lg font-medium flex items-center gap-3 transition font-rubik"
          >
            <FontAwesomeIcon icon={faCalendarCheck} />
            Get Started
          </button>
          <div className="mt-10 flex flex-wrap gap-8 justify-center md:justify-start font-poppins">
            <div className="text-center">
              <p className="text-xl sm:text-3xl font-bold text-blue-600">
                {prescriptionsCount}+
              </p>
              <p className="text-md sm:text-lg text-gray-600">Prescriptions</p>
            </div>
            <div className="text-center">
              <p className="sm:text-3xl font-bold text-blue-600">
                {doctorsCount}+
              </p>
              <p className="sm:text-lg text-gray-600">Verified Doctors</p>
            </div>
            <div className="text-center">
              <p className="sm:text-3xl font-bold text-blue-600">
                {countriesCount}+
              </p>
              <p className="sm:text-lg text-gray-600">Countries</p>
            </div>
            <div className="text-center">
              <p className="sm:text-3xl font-bold text-blue-600">100%</p>
              <p className="sm:text-lg text-gray-600">Data Privacy</p>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className=" md:w-3/6 text-center">
          <video
            className="rounded-xl w-full h-auto"
            autoPlay
            loop
            playsInline
            controls
          >
            <source src={HeroVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Scroll-to-Top Button */}
      {goUp && (
        <div
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 flex items-center justify-center bg-blue-600 text-white text-lg rounded-full shadow-lg cursor-pointer hover:bg-blue-700 transition z-30"
        >
          <FontAwesomeIcon icon={faAngleUp} />
        </div>
      )}
    </div>
  );
}

export default Hero;
