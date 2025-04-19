import React, { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import { Firestore } from "../firebaseConfig";
import toast from "react-hot-toast";
import Header from "./Header";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    message: "",
    queryType: "General Inquiry",
  });

  const [openFAQ, setOpenFAQ] = useState(null); // State for collapsible FAQs

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Send form data to Firestore (existing logic)
    try {
      await addDoc(collection(Firestore, "queries"), formData);
      toast.success("Your query has been submitted successfully!");
  
      const emailContent = `
        <h3>New Contact Us Query</h3>
        <p><strong>Full Name:</strong> ${formData.fullName}</p>
        <p><strong>Email Address:</strong> ${formData.email}</p>
        <p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>
        <p><strong>Query Type:</strong> ${formData.queryType}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
      `;
  
      const response = await fetch("https://doconrx-2.onrender.com/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: formData.email, 
          to: "infodoconrx@gmail.com",
          subject: `New Query from ${formData.fullName}`,
          text: formData.message,
          html: emailContent, 
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send email");
      }
  
      setFormData({
        fullName: "",
        email: "",
        phoneNumber: "",
        message: "",
        queryType: "General Inquiry",
      });
    } catch (error) {
      toast.error("There was an error submitting your query. Please try again later.");
    }
  };  

  return (
    <div className="w-full font-rubik">
      <Header />
      <section className="bg-gray-50 py-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Contact Us
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-sm font-medium text-gray-600 mb-2"
                  htmlFor="fullName"
                >
                  Full Name {" "}<span className="text-red-800 text-xl">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-600 mb-2"
                  htmlFor="email"
                >
                  Email Address{" "}<span className="text-red-800 text-xl">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-600 mb-2"
                  htmlFor="phoneNumber"
                >
                  Phone Number{" "}<span className="text-red-800 text-xl">*</span>
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-600 mb-2"
                  htmlFor="queryType"
                >
                  Query Type {" "} <span className="text-red-800 text-xl">*</span>
                </label>
                <select
                  id="queryType"
                  name="queryType"
                  value={formData.queryType}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
                >
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Feedback/Suggestions</option>
                  <option>Account Issues</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-600 mb-2"
                  htmlFor="message"
                >
                  Message {" "}<span className="text-red-800 text-xl">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 resize-none"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:ring focus:ring-blue-300"
              >
                Submit
              </button>
            </form>
          </div>

          {/* FAQs Section */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">FAQs</h3>
            <div className="space-y-4">
              {[
                {
                  question: "How do I create a prescription?",
                  answer:
                    'Follow our step-by-step guide on the "Process" page.',
                },
                {
                  question: "Is my data secure?",
                  answer:
                    "Absolutely. We use advanced encryption to ensure your data is protected.",
                },
                {
                  question: "Can I edit a prescription after generating it?",
                  answer:
                    "Yes, you can edit and re-generate prescriptions at any time.",
                },
                {
                  question: "Contact Us",
                  answer:
                    "Email: doconrx@gmail.com | Phone: +91 9491834404",
                },
              ].map((faq, index) => (
                <div
                  key={index}
                  className="bg-white shadow-md p-4 rounded-lg cursor-pointer"
                >
                  <div
                    className="flex justify-between items-center"
                    onClick={() => toggleFAQ(index)}
                  >
                    <p className="font-semibold text-gray-700">{faq.question}</p>
                    <span className="text-blue-600 text-xl">
                      {openFAQ === index ? "-" : "+"}
                    </span>
                  </div>
                  {openFAQ === index && (
                    <p className="text-gray-600 mt-2">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;
