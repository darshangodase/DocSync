import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrescription,
  faUserDoctor,
  faChartPie,
} from "@fortawesome/free-solid-svg-icons";

function Info() {
  const infoCards = [
    {
      title: "Digital Prescriptions",
      description:
        "Empower doctors with a seamless system to create, manage, and share digital prescriptions. Our platform supports multilingual input and generates professional prescriptions in PDF or JPG formats, ensuring convenience and accessibility for patients and medical staff.",
      icon: faPrescription,
    },
    {
      title: "Doctor Management",
      description:
        "Streamline the onboarding process for healthcare professionals. Admins can easily review and approve doctor registrations based on credentials, ensuring a trusted network of certified practitioners for patients.",
      icon: faUserDoctor,
    },
    {
      title: "Healthcare Communication",
      description:
        "DocSync to enhance the way you prescribe medicines and communicate with your patients. Register now and experience a modern solution tailored to your needs.",
      icon: faChartPie,
    },
  ];

  return (
    <div className="py-16 bg-white text-center font-rubik" id="services">
      <div className="mb-16">
        <h3 className="text-4xl font-bold  relative inline-block text-gray-800 font-poppins">
          <span>Our Services</span>
          <span className="block w-3/4 h-1 bg-pink-600 rounded-lg mt-2 mx-auto"></span>
        </h3>
        <p className="mt-8 text-md sm:text-lg leading-relaxed text-gray-600 font-rubik max-w-5xl mx-auto px-4">
          DocSync revolutionizes healthcare by bridging the gap between doctors
          and patients through a user-friendly platform. From creating digital
          prescriptions to providing detailed analytics for administrators, we
          offer a suite of features designed to streamline healthcare processes.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4">
        {infoCards.map((card, index) => (
          <div
            key={index}
            className="relative border-2 border-gray-200 rounded-lg bg-white p-8 shadow-sm hover:shadow-lg transition m-4"
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-100 rounded-full p-4">
              <FontAwesomeIcon
                icon={card.icon}
                className="text-blue-500 text-2xl"
              />
            </div>
            <h4 className="mt-10 text-xl font-bold text-gray-800 font-poppins">
              {card.title}
            </h4>
            <p className="mt-4 text-gray-600 text-base leading-relaxed font-rubik text-justify">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Info;
