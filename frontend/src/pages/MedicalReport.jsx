import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { addDoc, collection } from '@firebase/firestore';
import { Firestore } from '../firebaseConfig';
import html2pdf from 'html2pdf.js';
import {toast} from 'react-hot-toast';
import { FaAnglesLeft } from "react-icons/fa6";
import MedicalForm from '../components/MedicalForm';
import MedicalPreview from '../components/MedicalPreview';
import { uploadPdf } from '../utility/uploadPdf';

function MedicalReport() {
  const [formData, setFormData] = useState({
    patientName: "",
    organization: "",
    diagnosis: "",
    startDate: "",
    endDate: "",
    effectiveDate: "",
    place: "",
  });

  const [certificateId, setCertificateId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMessage, setProgressMessage] = useState("");

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const previewRef = useRef();

  useEffect(() => {
    if (!currentUser) {
      toast.error("Please log in to access this page.");
      navigate("/");
    } else if (user?.role === "admin") {
      toast.error("Only doctors can access this feature.");
      navigate("/");
    }
  }, [user, navigate, currentUser]);

  const generatePDF = () => {
    const element = previewRef.current;
    const options = {
      filename: "medical_certificate.pdf",
      image: { type: "jpeg", quality: 0.7 },
      html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    },
    jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
      margin: [10, 10, 10, 10],
      pagebreak: {
        mode: ["auto"],
      },
    };

    return html2pdf().set(options).from(element).outputPdf("blob")

  };

  const downloadPDF = () => {
    const element = previewRef.current;
    const options = {
      filename: "medical_certificate.pdf",
      image: { type: "jpeg", quality: 0.7 },
      html2canvas: {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
    },
    jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
        compress: true,
      },
      margin: [10, 10, 10, 10],
      pagebreak: {
        mode: ["auto"],
      },
    };

    return html2pdf().set(options).from(element).save()
  };


  const handleSubmit = async () => {
    try {
      setIsModalOpen(false);
      setUploadLoading(true);
      setProgress(10);
      setProgressMessage("Initializing submission...");

      const newCertificateId = `MED-${Date.now()}`;
      setCertificateId(newCertificateId);

      setProgress(30);
      setProgressMessage("Generating medical certificate...");
      const pdfBlob = await generatePDF();

      setProgress(60);
      setProgressMessage("Uploading certificate...");
      const uploadResult = await uploadPdf(pdfBlob);

      console.log("uploadresult",uploadResult);

      if (!uploadResult) {
        throw new Error("PDF upload failed");
      }
      
      await downloadPDF();
      setProgress(80);
      setProgressMessage("Saving to database...");

      const certificateData = {
        doctorUid: user?.uid,
        patientName: formData.patientName,
        dateIssued: new Date().toISOString(),
        diagnosis: formData.diagnosis,
        startDate: formData.startDate,
        endDate: formData.endDate,
        effectiveDate: formData.effectiveDate,
        place: formData.place,
        certificateId: newCertificateId,
        documentUrl: uploadResult,
      };

      await addDoc(collection(Firestore, "medicalCertificates"), certificateData);

      setProgress(100);
      setProgressMessage("Submission complete!");
      toast.success("Medical certificate generated successfully!");
      navigate("/doctor/dashboard");

    } catch (error) {
      console.error("Error submitting medical certificate:", error);
      toast.error("Failed to generate medical certificate");
    } finally {
      setUploadLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 py-8 font-rubik">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="flex justify-left mb-6">
          <button
            onClick={() => navigate("?tab=AdminMessage")}
            className="bg-blue-500 text-white p-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center gap-1"
          >
            <FaAnglesLeft />
            Dashboard
          </button>
        </div>

        <h1 className="text-4xl font-extrabold text-center text-blue-600 mb-8">
          Generate Medical Certificate
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Form Section */}
          <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">
              Certificate Details
            </h2>
            <MedicalForm formData={formData} onChange={setFormData} />
          </div>

          {/* Preview Section */}
          <div className="w-full md:w-1/2 bg-gray-100 rounded-lg shadow-md p-6 sticky top-8">
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
              Preview
            </h2>
            <MedicalPreview
              ref={previewRef}
              formData={formData}
              certificateId={certificateId}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 text-white p-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Generate Certificate
          </button>
        </div>

        {/* Confirmation Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg mx-auto ml-10 mr-10">
              <h2 className="text-xl font-bold mb-4">Confirm Submission</h2>
              <p>Are you sure you want to generate this medical certificate?</p>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-gray-700 p-2 px-4 rounded-lg hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-green-500 text-white p-2 px-4 rounded-lg hover:bg-green-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Loading Modal */}
        {uploadLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-lg mx-auto w-full md:w-auto md:min-w-[400px] shadow-xl">
              <h2 className="text-xl font-bold mb-4">Generating Certificate</h2>
              <p className="text-gray-600 mb-4">{progressMessage}</p>
              <div className="w-full bg-gray-200 rounded-full h-5 mb-2 overflow-hidden">
                <div
                  className="bg-blue-500 h-5 rounded-full transition-all duration-700 ease-in-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-600">{progress}% complete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MedicalReport;
