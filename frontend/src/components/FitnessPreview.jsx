import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';

const FitnessPreview = forwardRef(({ formData, certificateId }, ref) => {
  const user = useSelector((state) => state.user.user);
//   const auth = getAuth();

  return (
    <div ref={ref}>
      <div className="p-6 border border-gray-300 bg-white font-rubik">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold underline mb-4">FITNESS CERTIFICATE</h1>
          {certificateId && (
            <p className="text-sm italic mb-2">
              Certificate No: #{certificateId}
            </p>
          )}
        </div>

        {/* Signature Line */}
        <div className="mb-4">
          <p className="text-md">Signature of Applicant: ____________________</p>
        </div>

        {/* Doctor Declaration */}
        <div className="space-y-4 text-justify">
          <p className="leading-relaxed">
            I, <span className="font-semibold">{user?.name || "N/A"}</span>{" "}
            {user?.degree && <span>({user?.degree})</span>} do hereby certify that I had 
            carefully examined <span className="font-semibold">
            {formData?.patientName || "____"}</span>{" "}
            (name & designation of applicant) of the Office of the{" "}
            <span className="font-semibold">{formData?.organization || "____"}</span>{" "}
            whose signature is given above, and find that he/she has recovered from his/her illness 
            and is now fit to resume duties in Government service. 
          </p>
          
          <p className="leading-relaxed">
            I also certify that before arriving at this decision, I have examined the original medical 
            certificate and statement of the case (or certified copies thereof) on which leave was granted 
            or extended and have taken these into consideration in arriving at my decision.
          
          </p>
        </div>

        {/* Additional Details */}
        <div className="mt-8 space-y-2">
          <p className="text-sm">
            <span className="font-semibold">Place:</span> {formData?.place || "____"}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Date:</span>{" "}
            {formData?.issueDate 
              ? new Date(formData.issueDate).toLocaleDateString() 
              : new Date().toLocaleDateString()}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Registration No:</span>{" "}
            {user?.registrationNumber || "____"}
          </p>
        </div>

        {/* Signature Section */}
        <div className="mt-12 flex justify-end">
          <div className="flex flex-col text-center">
            <div className="mb-2 flex">
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
            <p className="text-sm font-bold">Signature of Government Medical Officer/Civil Surgeon/</p>
            <p className="text-sm font-bold">Staff Surgeon/Authorized Medical Attendant/</p>
            <p className="text-sm font-bold">Registered Medical Practitioner along with official seal</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-xs text-center text-gray-500">
          <p>This is a computer-generated fitness certificate.</p>
          <p>No physical signature is required.</p>
        </div>
      </div>
    </div>
  );
});

export default FitnessPreview;
