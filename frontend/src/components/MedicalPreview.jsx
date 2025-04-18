import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';

const MedicalPreview = forwardRef(({ formData, certificateId }, ref) => {
  const user = useSelector((state) => state.user.user);
//   const auth = getAuth();

  return (
    <div ref={ref}>
      <div className="p-6 border border-gray-300 bg-white font-rubik">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold underline mb-4">MEDICAL CERTIFICATE</h1>
          {certificateId && (
            <p className="text-sm italic mb-2">
              Certificate No: #{certificateId}
            </p>
          )}
        </div>

        {/* Doctor Declaration */}
        <div className="space-y-4 text-justify">
        <p className="text-md">Signature of Applicant: ____________________</p>
          <p className="leading-relaxed">
            I,<span className="font-semibold">{user?.name || "N/A"}</span>,{" "}
            {user?.degree && <span>({user?.degree})</span>} after careful personal
            examination of the case hereby certify that Shri/Smt./Mr./Ms.{" "}
            <span className="font-semibold">{formData?.patientName || "____"}</span>{" "}
            (name & designation of applicant) of the Office of the{" "}
            <span className="font-semibold">{formData?.organization || "____"}</span>{" "}
            whose signature is given above is suffering from{" "}
            <span className="font-semibold">{formData?.diagnosis || "____"}</span>{" "}
            and, therefore, I consider that a period of absence from duty from{" "}
            <span className="font-semibold">
              {formData?.startDate
                ? new Date(formData.startDate).toLocaleDateString()
                : "____"}
            </span>{" "}
            to{" "}
            <span className="font-semibold">
              {formData?.endDate
                ? new Date(formData.endDate).toLocaleDateString()
                : "____"}
            </span>{" "}
            with effect from{" "}
            <span className="font-semibold">
              {formData?.effectiveDate
                ? new Date(formData.effectiveDate).toLocaleDateString()
                : "____"}
            </span>{" "}
            is absolutely necessary for the restoration of his/her health.
          </p>
        </div>

        {/* Additional Details */}
        <div className="mt-8 space-y-2 ">
          <p className="text-sm">
            <span className="font-semibold">Place:</span> {formData?.place || "____"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Date:</span>{" "}
            {new Date().toLocaleDateString()}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Registration No:</span>{" "}
            {user?.registrationNumber || "____"}
          </p>
        </div>

        {/* Signature Section */}
        <div className="mt-12 flex justify-end ">
          <div className="flex flex-col text-center">
            <div className="mb-2  flex">
              {user?.signature && (
                <img
                  src={user.signature}
                  alt="Doctor's Signature"
                  className="w-44 h-10 object-contain ml-16"
                />
              )}
            </div>
            <p className="font-bold">{user?.name}</p>
            <p className="text-sm">{user?.degree}</p>
            <p className="text-sm mb-8">{user?.speciality?.join(", ")}</p>
            <p className="text-sm font-bold">Signature of Medical Officer/Civil Surgeon/</p>
            <p className="text-sm font-bold">Staff Surgeon/Authorized Medical Attendant/</p>
            <p className="text-sm font-bold">Registered Medical Practitioner along with official seal</p>

          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-xs text-center text-gray-500">
          <p>This is a computer-generated medical certificate.</p>
          <p>No physical signature is required.</p>
        </div>
      </div>
    </div>
  );
});

export default MedicalPreview;
