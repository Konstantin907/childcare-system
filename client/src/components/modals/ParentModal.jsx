import React,{ useState } from 'react';
import './parentModal.css';
import { toast } from 'react-toastify'

import { IoClose } from "react-icons/io5";


const ParentModal = ({ setParentModalState }) => {

  const [formData, setFormData] = useState({
    firstParentName: '',
    firstParentLastName: '',
    secondParentName: '',
    secondParentLastName: '',
    childFirstName: '',
    childLastName: '',
    childAge: '',
    email: '',
    institution: 'Institution1'
  });

  // handle change:
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({...prevData, [name]: value}));
  }

  // submitting:

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/parent/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if(!response.ok) {
        throw new Error('Problem with api call')
      }

      const data = await response.json();
      console.log("Parent created successfully:", data);
      toast.success('Record successfully added')
      setParentModalState(false)

    } catch (error) {
      console.log('Error:', error);
      toast.error('Insufficient record')
    }
  }

  return (
    <div className='parentModalContainer'>
        <div className='parentModalHeading'>
            <h2>Register Parent</h2>
            <IoClose className='closeIcon' onClick={()=>setParentModalState(false)}/>
        </div>
        
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="input-data">
            <input 
            type="text" 
            name="firstParentName" 
            value={formData.firstParentName} 
            onChange={handleChange} 
            required 
            />
            <label>First Parent Name</label>
          </div>
          <div className="input-data">
            <input 
             type="text" 
             name="firstParentLastName" 
             value={formData.firstParentLastName} 
             onChange={handleChange} 
             required 
            />
            <label>First Parent Lastname</label>
          </div>
        </div>
        <div className="form-row">
            {/* second parent optional*/}
          <div className="input-data">
            <input  
              type="text" 
              name="secondParentName" 
              value={formData.secondParentName} 
              onChange={handleChange} 
            />
            <label>Second Parent - Name</label>
          </div>
          <div className="input-data">
            <input 
                type="text" 
                name="secondParentLastName" 
                value={formData.secondParentLastName} 
                onChange={handleChange} 
            />
            <label>Second Parent - Lastname</label>
          </div>
        </div>
        {/* child */}
        <div className="form-row">
          <div className="input-data">
            <input 
              type="text" 
              name="childFirstName" 
              value={formData.childFirstName} 
              onChange={handleChange} 
              required 
            
            />
            <label>Child's First Name</label>
          </div>
          <div className="input-data">
            <input 
                type="text" 
                name="childLastName" 
                value={formData.childLastName} 
                onChange={handleChange} 
                required 
            />
            <label>Child's Lastname</label>
          </div>
        </div>
        <div className="form-row">
          <div className="input-data">
            <input 
              type="number" 
              name="childAge" 
              value={formData.childAge} 
              onChange={handleChange} 
              required 
              min="2" 
              max="7" 
            />
            <label>Age of the child</label>
          </div>

          
          <div className="input-data">

            {/* select */}
            <select className='select'
              name="institution"
              value={formData.institution} 
              onChange={handleChange} 
              required
            >
                <option value="volvo">Institution1</option>
                <option value="saab">Institution1</option>
                <option value="mercedes">Institution1</option>
                <option value="audi">Institution1</option>
            </select>
          </div>

          
        </div>

        <div className="input-data-center">
            <input 
                type="text" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
            />
            <label>Guardian email</label>
          </div>
        
        <div className="form-row submit-btn">
          <div className="input-data">
            <input type="submit" value="Register Parent" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ParentModal;
