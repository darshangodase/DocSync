import React, { useState, useEffect } from 'react';
import { Firestore } from "../firebaseConfig";
import { collection, getDocs, addDoc } from 'firebase/firestore';
import Modal from 'react-modal';
import Header from './Header';

Modal.setAppElement('#root');

const TestimonialPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    // Fetch testimonials from Firestore
    const fetchTestimonials = async () => {
      const testimonialCollection = collection(Firestore, 'testimonials'); 
      const testimonialSnapshot = await getDocs(testimonialCollection);
      const testimonialList = testimonialSnapshot.docs.map(doc => doc.data());
      setTestimonials(testimonialList);
    };

    fetchTestimonials();
  }, []);

  const handleAddFeedback = async () => {
    if (feedback.trim() && name.trim()) {
      await addDoc(collection(Firestore, 'testimonials'), {
        name: name,
        feedback: feedback,
        timestamp: new Date(),
      });
      setModalIsOpen(false); // Close modal after submission
      setFeedback('');
      setName('');
    }
  };

  return (
    <div className="w-full min-h-screen font-rubik">
        <Header/>
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 font-poppins">Our Client Testimonials</h1>
        <button 
          className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          onClick={() => setModalIsOpen(true)}
        >
          Give Feedback
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {testimonials.length > 0 ? (
          testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <p className="text-lg text-gray-600 mb-4">"{testimonial.feedback}"</p>
              <p className="text-sm font-medium text-gray-800">- {testimonial.name}</p>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No testimonials yet.</p>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-8 rounded-lg w-96 shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-4">Share Your Feedback</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Your Name</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Your Feedback</label>
            <textarea
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              rows="4"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>
          <div className="flex justify-center gap-4">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={handleAddFeedback}
            >
              Submit
            </button>
            <button
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
              onClick={() => setModalIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
    </div>
  );
};

export default TestimonialPage;
