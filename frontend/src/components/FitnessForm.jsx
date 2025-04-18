import React from 'react';
import { FiUser, FiFileText, FiCalendar, FiMapPin } from "react-icons/fi";

function FitnessForm({ formData, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Patient Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FiUser className="text-blue-500" />
          Patient Details
        </h3>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          placeholder="Patient's Full Name"
          className="w-full p-2 border rounded-md"
        />
        <input
          type="text"
          name="organization"
          value={formData.organization}
          onChange={handleChange}
          placeholder="Organization/Office Name"
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FiMapPin className="text-purple-500" />
          Location
        </h3>
        <input
          type="text"
          name="place"
          value={formData.place}
          onChange={handleChange}
          placeholder="Place/City"
          className="w-full p-2 border rounded-md"
        />
      </div>
{/* 
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FiFileText className="text-green-500" />
          Previous Illness Details
        </h3>
        <textarea
          name="illness"
          value={formData.illness}
          onChange={handleChange}
          placeholder="Previously Diagnosed Illness/Condition"
          className="w-full p-2 border rounded-md"
          rows="3"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Original Medical Certificate Date
          </label>
          <input
            type="date"
            name="originalCertificateDate"
            value={formData.originalCertificateDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FiFileText className="text-orange-500" />
          Additional Comments
        </h3>
        <textarea
          name="additionalComments"
          value={formData.additionalComments}
          onChange={handleChange}
          placeholder="Any additional comments or notes"
          className="w-full p-2 border rounded-md"
          rows="3"
        />
      </div> */}

      {/* <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FiCalendar className="text-red-500" />
          Certificate Date
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issue Date
          </label>
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div> */}
    </div>
  );
}
export default FitnessForm;
