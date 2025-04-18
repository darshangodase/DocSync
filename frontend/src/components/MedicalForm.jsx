import React from 'react';
import { FiUser, FiFileText, FiCalendar, FiMapPin } from "react-icons/fi";

function MedicalForm({ formData, onChange }) {
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

      {/* Diagnosis */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FiFileText className="text-green-500" />
          Medical Details
        </h3>
        <textarea
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          placeholder="Diagnosis/Condition"
          className="w-full p-2 border rounded-md"
          rows="3"
        />
      </div>

      {/* Dates */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <FiCalendar className="text-red-500" />
          Leave Period
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Effective From
          </label>
          <input
            type="date"
            name="effectiveDate"
            value={formData.effectiveDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

export default MedicalForm;