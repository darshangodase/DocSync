import React from 'react';
import Header from './Header';

const HowItWorks = () => {
  return (
    <div className="w-full">
      <Header/>
    <section className="w-full bg-gray-50 py-10 px-4 font-rubik">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 font-poppins">How It Works</h2>
        <p className="text-gray-600 mb-10 text-lg">
          Simple Steps to Create and Share Prescriptions
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Step 1: Sign Up or Log In</h3>
            <p className="text-gray-600">
              Create an account or log in to your existing account using our secure platform.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Step 2: Create a Prescription</h3>
            <p className="text-gray-600">
              Use our user-friendly interface to draft prescriptions. Select medications, add instructions, and choose the patient’s preferred language.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Step 3: Preview and Customize</h3>
            <p className="text-gray-600">
              Review the prescription for accuracy. Customize it with additional notes or patient details as needed.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Step 4: Generate PDF</h3>
            <p className="text-gray-600">
              Click on the "Generate PDF" button to create a digital copy of the prescription.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Step 5: Share with Patients</h3>
            <p className="text-gray-600">
              Share the prescription via email, SMS, or a downloadable link. Patients can access it anytime, anywhere.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Step 6: Manage and Store</h3>
            <p className="text-gray-600">
              Access all your prescriptions in one place. Retrieve and manage patient histories with ease.
            </p>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default HowItWorks;
