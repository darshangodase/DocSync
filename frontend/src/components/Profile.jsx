import React from "react";
import { useSelector } from "react-redux"; // Redux hook to get user state
import { getAuth } from "firebase/auth";

const Profile = () => {
  const user = useSelector((state) => state.user.user); 
  const auth = getAuth();
  const currentUser = auth.currentUser;

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold animate-pulse">
          Loading doctor details...
        </p>
      </div>
    );
  }

  const {
    name,
    gender,
    age,
    degree,
    speciality,
    subSpeciality,
    registrationNumber,
    website,
    address,
    mobileNumber,
    universityName,
    hospitalname,
    fathersName,
    dob,
    mbbsYear,
    additionalCertifications,
    country,
    educationcountry,
    educationstate,
    state,
    city,
    signature,
  } = user;

  return (
    <div className="flex justify-center items-center min-h-screen  w-full font-rubik">
      <div className="max-w-4xl w-full  rounded-lg shadow-lg p-10 sm:p-10 m-4 bg-gradient-to-r from-blue-100 to-blue-50">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6 font-poppins">
          {name}'s Profile
        </h2>
        <div className="flex flex-wrap -mx-4">
          {/* Personal Details */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Personal Details
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Full Name:</strong> {name}
              </li>
              <li>
                <strong>Gender:</strong> {gender}
              </li>
              <li>
                <strong>Age:</strong> {age}
              </li>
              <li>
                <strong>Date of Birth:</strong> {dob}
              </li>
              <li>
                <strong>Father's Name:</strong> {fathersName}
              </li>
              <li>
                <strong>Mobile Number:</strong> {mobileNumber}
              </li>
              <li>
                <strong>Email:</strong> {currentUser?.email}
              </li>
            </ul>
          </div>

          {/* Professional Details */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Professional Details
            </h3>
            <ul className="space-y-2 text-gray-700 truncate">
              <li>
                <strong>Clinic/Hospital Name:</strong> {hospitalname}
              </li>
              <li>
                <strong>Clinic/Hospital Address:</strong> {address}
              </li>
              <li>
                <strong>Speciality:</strong> {speciality.join(", ")}
              </li>{" "}
              {subSpeciality && (
                <li>
                  <strong>Sub-Speciality:</strong>{" "}
                  {subSpeciality || "Not Provided"}
                </li>
              )}
              <li>
                <strong>Registration Number:</strong> {registrationNumber}
              </li>
              <li>
                <strong>Website:</strong> {website || "Not Provided"}
              </li>
            </ul>
          </div>

          {/* Additional Information */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Additional Information
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Country:</strong> {country}
              </li>
              <li>
                <strong>State:</strong> {state}
              </li>
              <li>
                <strong>City:</strong> {city}
              </li>
            </ul>
          </div>

          {/* Education */}
          <div className="w-full md:w-1/2 px-4 mb-6">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">
              Educational Details
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Degree:</strong> {degree}
              </li>
              <li>
                <strong>College/University Name:</strong> {universityName}
              </li>
              <li>
                <strong>Country Of Study:</strong> {educationcountry}
              </li>
              <li>
                <strong>State Of Education:</strong> {educationstate}
              </li>
              <li>
                <strong>Degree Completion Year:</strong> {mbbsYear}
              </li>
              {additionalCertifications && (
                <li>
                  <strong>Additional Certifications:</strong>{" "}
                  {additionalCertifications}
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Signature */}
        {signature && (
          <div className="mt-6 flex justify-center items-center ">
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4 text-center">
                Signature
              </h3>
              <img
                src={signature}
                alt="Doctor's Signature"
                className="h-40 max-w-xs border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
              />
            </div>
          </div>
        )}
        {/* Note */}
        <div className="mt-8 text-center">
          <p className="text-base text-red-500 font-semibold">
            *For any updates, edits, or changes to your profile, please contact
            the admin for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
