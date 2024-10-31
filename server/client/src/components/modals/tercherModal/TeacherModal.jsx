import React, { useState, useEffect } from 'react';
import './teacherModal.css';

import { IoClose } from "react-icons/io5";
import { toast } from 'react-toastify';
import { storage } from '../../../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'

const TeacherModal = ({ setTeacherModal }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    institution: 'institution1',
    description: '',
    picture: '',
  });
  const [imageUpload, setImageUpload] = useState(null);


  const handleSubmitTeacher = async (e) => {
    e.preventDefault();
  
    if (imageUpload == null) {
      toast.error('Please select an image to upload');
      return;
    }
  
    try {
      
      const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
      const snapshot = await uploadBytes(imageRef, imageUpload);
  
     
      const pictureUrl = await getDownloadURL(snapshot.ref);
  
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/teacher/create-teacher`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          picture: pictureUrl, 
        }),
      });
  
      if (!response.ok) {
        throw new Error('Problem occurred with teacher creation');
      }
  
      const data = await response.json();
      toast.success('Teacher registered successfully');
      setTeacherModal(false);
    } catch (error) {
      console.log(error);
      toast.error('Failed to register teacher');
    }
  };
  

  return (
    <div className='teacherModalContainer'>
      <div className='parentModalHeading'>
        <h2>Register Teacher</h2>
        <IoClose className='closeIcon' onClick={() => setTeacherModal(false)} />
      </div>

      <form onSubmit={handleSubmitTeacher}>
        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={(e) => setFormData(prevData => ({ ...prevData, firstName: e.target.value }))}
              required
            />
            <label>Teacher's First Name</label>
          </div>
        </div>

        <div className="form-row">
          <div className="input-data">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={(e) => setFormData(prevData => ({ ...prevData, lastName: e.target.value }))}
              required
            />
            <label>Teacher's Last Name</label>
          </div>
        </div>

        <div className="form-row">
          <div className="input-data">
            <select
              name="institution"
              className="select"
              value={formData.institution}
              onChange={(e) => setFormData(prevData => ({ ...prevData, institution: e.target.value }))}
              required
            >
              <option value="">Select Institution</option>
              <option value="institution1">Institution 1</option>
              <option value="institution2">Institution 2</option>
              <option value="institution3">Institution 3</option>
              <option value="institution4">Institution 4</option>
            </select>
            <label className="select-label">Institution</label>
          </div>
        </div>

        <div className="form-row">
          <div className="input-data">
            <textarea
              className="descTextarea"
              name="description"
              value={formData.description}
              onChange={(e) => setFormData(prevData => ({ ...prevData, description: e.target.value }))}
              required
              placeholder="Write a short description..."
            />
            <label>Short Description</label>
          </div>
        </div>

{/* image upload */}
        <div className="form-row">
          <div className="input-data">
            <input
              type="file"
              onChange={(e) => setImageUpload(e.target.files[0])}
              required
            />
            {/* <button 
              className='uploadButton'
              >
                Upload Image
            </button> */}
            <label>Upload Teacher's Picture</label>
          </div>
        </div>

        <div className="form-row submit-btn">
          <div className="input-data">
            <button
              className="register"
              type="submit"
            >
              Register Teacher
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TeacherModal;
