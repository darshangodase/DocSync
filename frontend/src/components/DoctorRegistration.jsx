import React, { useState, useEffect,useRef } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { Firestore } from "../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import uploadFile from "../utility/uploadFile";
import { Spinner } from "flowbite-react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import LoginImage from "../assets/login_image.png";

const DoctorRegistration = () => {
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [educationCountryId, setEducationCountryId] = useState(0);
  const navigate = useNavigate();
  const {handleSignOut } = useAuth();
  const suppressEffect = useRef(false); 
  const auth = getAuth();

  useEffect(() => {
    if (suppressEffect.current) return;

    if (auth?.currentUser?.email) {
      toast.error("You are already logged in. Please log out to register");
      navigate("/");
    }
  }, [auth?.currentUser?.email, navigate]);  

  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    dob: "",
    fathersName: "",
    country: "",
    state: "",
    city: "",
    mobileNumber: "",
    email: "",
    speciality: [],
    subSpeciality: "",
    universityName: "",
    educationcountry: "",
    educationstate: "",
    degree: "",
    mbbsYear: "",
    registrationNumber: "",
    hospitalname: "",
    address: "",
    website: "",
    password: "",
    signature: "",
  });

  const specialityOptions = [
    "Anesthesiologist",
    "Ayurvedic Practitioner",
    "Cardiologist",
    "Cardiovascular and Thoracic Surgeon (CVTS Specialist)",
    "Dentist",
    "Dermatologist",
    "Dietitian",
    "Endocrinologist",
    "ENT Specialist",
    "Gastroenterologist",
    "General Physician",
    "General Surgeon",
    "Gynecologist",
    "Hematologist",
    "Homeopathic Practitioner",
    "Infectious Disease Specialist",
    "Internal Medicine Specialist",
    "Medical Oncologist",
    "Neonatologist",
    "Nephrologist",
    "Neurologist",
    "Orthopedic Surgeon",
    "Pathologist (Microbiology)",
    "Pathologist (Biochemistry)",
    "Pediatrician",
    "Plastic Surgeon",
    "Psychiatrist",
    "Pulmonologist",
    "Radiation Oncologist",
    "Unani Practitioner",
    "Urologist",
  ];

  const [customSpeciality, setCustomSpeciality] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);

  const handleSpecialityChange = (e) => {
    setShowCustomInput(false);
    const selectedOption = e.target.value;
    if (selectedOption === "Other") {
      setShowCustomInput(true);
    } else if (
      selectedOption &&
      !formData.speciality.includes(selectedOption)
    ) {
      setFormData({
        ...formData,
        speciality: [...formData.speciality, selectedOption],
      });
    }
  };

  const handleAddCustomSpeciality = () => {
    if (
      customSpeciality.trim() &&
      !formData.speciality.includes(customSpeciality)
    ) {
      setFormData({
        ...formData,
        speciality: [...formData.speciality, customSpeciality.trim()],
      });
      setCustomSpeciality("");
      setShowCustomInput(false);
    }
  };

  const removeSpeciality = (speciality) => {
    setFormData({
      ...formData,
      speciality: formData.speciality.filter((item) => item !== speciality),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadLoading(true);
    try {
      const uploadResult = await uploadFile(file);

      setFormData((prev) => ({
        ...prev,
        signature: uploadResult?.url,
      }));
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
    } finally {
      setUploadLoading(false);
      setTimeout(() => {
        suppressEffect.current = false; 
      }, 1000); 
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1946 }, (_, i) => 1947 + i);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    suppressEffect.current = true; 

    const auth = getAuth();
    const { email, password, dob, ...doctorData } = formData;

    const calculateAge = (dob) => {
      const birthDate = new Date(dob);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();
      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    };

    const age = calculateAge(dob);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const uid = userCredential.user.uid;

      await addDoc(collection(Firestore, "users"), {
        ...doctorData,
        dob,
        age,
        uid,
        email,
        status: "pending",
        role: "doctor",
      });

      await handleSignOut(); 
       
      toast.success("Doctor registered successfully.");

      setFormData({
        name: "",
        gender: "",
        dob: "",
        fathersName: "",
        country: "",
        state: "",
        city: "",
        mobileNumber: "",
        email: "",
        speciality: [],
        subSpeciality: "",
        universityName: "",
        educationcountry: "",
        educationstate: "",
        degree: "",
        mbbsYear: "",
        registrationNumber: "",
        hospitalname: "",
        address: "",
        website: "",
        password: "",
        signature: "",
      });

      navigate("/request");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email is already in use. Please use a different email.");
      } else if (error.code === "auth/weak-password") {
        toast.error("Password is too weak. Please choose a stronger password.");
      } else {
        toast.error("Error while registering doctor. Please try again.");
      }
      console.error("Firebase Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-50 w-full flex justify-center items-center font-rubik">
    <div className="w-full flex flex-wrap lg:flex-nowrap justify-center items-stretch">
      {/* Left Section: Info and Image Section */}
      <div className="flex flex-col justify-start items-center text-start bg-blue-500 text-white p-6 w-full lg:max-w-md shadow-md lg:min-h-screen self-stretch">
        <img
          src={LoginImage}
          alt="Login Illustration"
          className="w-3/4 mb-6 rounded-lg shadow-lg"
        />
        <h1 className="text-3xl font-bold mb-4">Access Your Account or Get Started</h1>
        <p className="text-lg mb-6">
          Sign up today or Log in to your account to continue using DocSync to explore our features.
        </p>
        <ul className="text-left list-disc pl-6 space-y-2">
          <li>Secure access to your prescriptions.</li>
          <li>Multilingual support for diverse patient needs.</li>
          <li>Convenient digital sharing options.</li>
        </ul>
        <p className="mt-6">
          Experience the future of prescription management with{" "}
          <span className="font-bold">DocSync</span>.
        </p>
      </div>
  
      {/* Right Section: Registration Form */}
      <div className="flex-grow h-full overflow-y-auto ">
        <div className="max-w-full mx-auto p-6 bg-white shadow-md  font-rubik min-w-[300px] sm:min-w-[400px]">
          <h2 className="sm:text-3xl  text-2xl font-bold mb-6 text-center">
            Doctor Registration
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Full Name <span className="text-red-500">*</span>{" "}
                <span className="fon" style={{ fontStyle: "italic" }}>
                  (Example: Dr. Patrick Hales)
                </span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData((prev) => ({ ...prev, name: e.target.value }));
                }}
                className="w-full px-4 py-2 border rounded-md placeholder:text-sm"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Gender */}
            {/* <div className="flex items-center justify-between gap-2"> */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Gender<span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md "
                  required
                >
                  <option value="" className=" text-sm">
                    Select Gender
                  </option>
                  <option value="Male" className=" text-sm">
                    Male
                  </option>
                  <option value="Female" className=" text-sm">
                    Female
                  </option>
                  <option value="Other" className=" text-sm">
                    Other
                  </option>
                </select>
              </div>

              {/* DOB */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 truncate">
                  Date of Birth (DD/MM/YYYY){" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={(e) => {
                    const dob = e.target.value;
                    setFormData((prev) => ({ ...prev, dob }));
                  }}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                  min={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 120)
                    )
                      .toISOString()
                      .split("T")[0]
                  }
                  max={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 18)
                    )
                      .toISOString()
                      .split("T")[0]
                  }
                />
              </div>
            {/* </div> */}
            {/* Father's Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Father’s Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fathersName"
                value={formData.fathersName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md placeholder:text-sm"
                placeholder="Enter your father's name"
                required
              />
            </div>

            {/* Country Select */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Country<span className="text-red-500">*</span>
              </label>
              <CountrySelect
                name="country"
                value={formData.country}
                onChange={(e) => {
                  setFormData({ ...formData, country: e.name });
                  setCountryId(e.id);
                }}
                placeHolder="Select Country"
                className="w-full px-4 py-2 border rounded-md "
                required
              />
            </div>

            {/* State Select */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                State<span className="text-red-500">*</span>
              </label>
              <StateSelect
                countryid={countryId}
                onChange={(e) => {
                  setStateId(e.id);
                  setFormData({ ...formData, state: e.name });
                }}
                placeHolder="Select State"
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            {/* City Select */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                City<span className="text-red-500">*</span>
              </label>
              <CitySelect
                countryid={countryId}
                stateid={stateId}
                onChange={(e) => {
                  setFormData({ ...formData, city: e.name });
                }}
                placeHolder="Select City"
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            {/* Mobile Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Mobile Number<span className="text-red-500">*</span>
              </label>
              <PhoneInput
                international
                defaultCountry="IN" // Set default country to India
                value={formData.mobileNumber} // Bind formData.mobileNumber to PhoneInput
                onChange={(value) => {
                  setFormData({ ...formData, mobileNumber: value }); // Update formData.mobileNumber with the entered value
                }}
                placeholder="Enter phone number"
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md placeholder:text-sm"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Speciality */}
            <div className="p-6 bg-gray-100 rounded-md mb-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Speciality <span className="text-red-500">*</span>
                </label>

                {/* Dropdown for selecting specialities */}
                <select
                  value=""
                  onChange={handleSpecialityChange}
                  className="w-full px-4 py-2 border rounded-md"
                >
                  <option value="">Select Speciality</option>
                  {specialityOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>

                {/* Chips for selected specialities */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.speciality.map((speciality, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full text-xs"
                    >
                      <span>{speciality}</span>
                      <button
                        type="button"
                        onClick={() => removeSpeciality(speciality)}
                        className="ml-2 text-white rounded-full p-1 text-xs"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* Input for custom speciality */}
                {showCustomInput && (
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="text"
                      value={customSpeciality}
                      onChange={(e) => setCustomSpeciality(e.target.value)}
                      placeholder="Specify"
                      className="w-full px-2 py-1 border rounded-md"
                    />
                    <button
                      type="button"
                      onClick={handleAddCustomSpeciality}
                      className="bg-blue-500 text-white px-3 py-2  text-sm rounded-md"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sub-Speciality */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Sub-Speciality
              </label>
              <input
                type="text"
                name="subSpeciality"
                value={formData.subSpeciality}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md placeholder:text-sm"
                placeholder="Enter your Sub Speciality"
              />
            </div>

            {/* University Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                College/University Name <span className="text-red-500">*</span>{" "}
                <span className="fon" style={{ fontStyle: "italic" }}>
                  (Enter Full Name with City)
                </span>
              </label>
              <input
                type="text"
                name="universityName"
                value={formData.universityName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md placeholder:text-sm"
                placeholder="Enter your university name"
                required
              />
            </div>

            {/* <div className="flex gap-2 items-center justify-between"> */}
              {/* EducationCountry Select */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 truncate">
                  Country of Study<span className="text-red-500">*</span>
                </label>
                <CountrySelect
                  name="educationcountry"
                  value={formData.educationcountry}
                  onChange={(e) => {
                    setFormData({ ...formData, educationcountry: e.name });
                    setEducationCountryId(e.id);
                  }}
                  placeHolder="Select"
                  className="w-full px-4 py-2 border rounded-md "
                  required
                />
              </div>

              {/* EducationState Select */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 truncate">
                  State of Study<span className="text-red-500">*</span>
                </label>
                <StateSelect
                  countryid={educationCountryId}
                  onChange={(e) => {
                    setFormData({ ...formData, educationstate: e.name });
                  }}
                  placeHolder="Select"
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>
            {/* </div> */}

            {/* Degree */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Degree <span className="text-red-500">*</span> 
                <span className="fon" style={{ fontStyle: "italic" }}>
                (Example: MD(Pediatrics) , DNB(Neonatology) in USA) </span>
              </label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md placeholder:text-sm "
                placeholder="Enter your degree"
                required
              />
            </div>

            {/* <div className="flex gap-2 items-center justify-between"> */}
              {/* UG Passout Year*/}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 ">
                UG Passout Year<span className="text-red-500">*</span>
                </label>
                <select
                  name="mbbsYear"
                  value={formData.mbbsYear}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md placeholder:text-sm"
                  required
                >
                  <option value="text-sm" disabled>
                    Select your UG Passout Year
                  </option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Registration Number */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2 ">
                  Registration Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md placeholder:text-sm "
                  placeholder="Enter your Reg.No"
                  required
                />
              </div>
            {/* </div> */}

            {/* Hospital Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Hospital Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="hospitalname"
                value={formData.hospitalname}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md placeholder:text-sm"
                placeholder="Enter your Hospital name"
                required
              />
            </div>

            {/* Hospital Address */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Hospital Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md placeholder:text-sm"
                placeholder="Enter your Hospital address"
                required
              />
            </div>

            {/* Website */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md placeholder:text-sm"
                placeholder="Enter your website"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md placeholder:text-sm"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Signature */}
            <div className="mb-4 relative">
              <label className="block text-sm font-medium mb-2">
                Signature<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`w-full px-4 py-2 border rounded-md ${
                    uploadLoading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  required
                  disabled={uploadLoading}
                />
                {uploadLoading && (
                  <Spinner
                    size="sm"
                    color="info"
                    aria-label="Uploading..."
                    className="absolute right-4"
                  />
                )}
              </div>
            </div>

            </div>
            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                disabled={uploadLoading || loading}
              >
                {loading ? "Submitting..." : "Register"}
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorRegistration;
