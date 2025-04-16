import React from "react";
import Doctor from "../Assets/doctor-group.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";

function About() {
  return (
    <div className="w-full">
      <Header/>
    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 py-16 px-4 bg-gradient-to-r from-blue-50 to-blue-100 font-rubik"id="about">
      {/* Image Section */}
      <div className="lg:w-1/2 flex justify-center">
        <img src={Doctor} alt="Doctor Group" className="w-4/5 h-auto" />
      </div>

      {/* Text Content Section */}
      <div className="lg:w-1/2 text-center lg:text-left">
        <h3 className="text-4xl font-bold font-poppins text-gray-800 relative inline-block">
          <span>About Us</span>
          <span className="block w-3/4 h-1 bg-pink-600 rounded-lg mt-2 mx-auto"></span>
        </h3>
        <p className="mt-8 text-lg text-gray-600 font-rubik leading-relaxed">
          <p className="italic font-bold text-xl text-black ">
            Empowering Healthcare Professionals with Modern Solutions
          </p>{" "}
          At DocSync, we are dedicated to transforming the way prescriptions are
          created and shared. Our mission is to enhance healthcare communication
          through technology, ensuring that every patient receives accurate and
          comprehensible prescriptions.
          <p className=" mt-3">
            <span className=" font-poppins font-bold text-blue-500 italic">
              Our Vision{" "}
            </span>{" "}
            To bridge the gap between doctors, patients, and pharmacies by
            providing a platform that ensures clarity, accessibility, and
            efficiency in prescription management.
          </p>
        </p>

        <h4 className="mt-12 text-2xl font-bold font-poppins text-gray-800">
          Our Values
        </h4>

        {/* Solution Steps */}
        <div className="mt-8">
          <div className="mt-6">
            <p className="flex items-center text-lg font-bold font-rubik text-gray-800">
              <FontAwesomeIcon
                className="text-pink-600 mr-2"
                icon={faCircleChevronRight}
              />
              Innovation
            </p>
            <p className="mt-2 text-gray-600 text-base leading-relaxed font-rubik">
              Continuously improving our platform to meet the evolving needs of
              healthcare professionals.
            </p>
          </div>

          <div className="mt-6">
            <p className="flex items-center text-lg font-bold font-rubik text-gray-800">
              <FontAwesomeIcon
                className="text-pink-600 mr-2"
                icon={faCircleChevronRight}
              />
              Simplicity
            </p>
            <p className="mt-2 text-gray-600 text-base leading-relaxed font-rubik">
              Designing tools that are easy to use, even for those with minimal
              technical expertise.
            </p>
          </div>

          <div className="mt-6">
            <p className="flex items-center text-lg font-bold font-rubik text-gray-800">
              <FontAwesomeIcon
                className="text-pink-600 mr-2"
                icon={faCircleChevronRight}
              />
              Inclusivity
            </p>
            <p className="mt-2 text-gray-600 text-base leading-relaxed font-rubik">
              Supporting diverse patient needs with multilingual capabilities.
            </p>
          </div>
          <div className="mt-6">
            <p className="flex items-center text-lg font-bold font-rubik text-gray-800">
              <FontAwesomeIcon
                className="text-pink-600 mr-2"
                icon={faCircleChevronRight}
              />
              Security
            </p>
            <p className="mt-2 text-gray-600 text-base leading-relaxed font-rubik">
              Ensuring that all prescription data is handled with the utmost
              confidentiality and care.{" "}
            </p>
          </div>
          <div className="mt-6">
            <p className="flex items-center text-lg font-bold font-rubik text-gray-800">
              <FontAwesomeIcon
                className="text-pink-600 mr-2"
                icon={faCircleChevronRight}
              />
              Join Our Community
            </p>
            <p className="mt-2 text-gray-600 text-base leading-relaxed font-rubik">
              Become a part of a growing network of doctors who trust DocSync to
              streamline their prescription process. Together, let’s build a
              future where healthcare communication is seamless and effective.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default About;
