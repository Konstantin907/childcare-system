import React, { useState } from 'react'
import './parentSignIn.css'
import { toast } from 'react-toastify';


const ParentSignIn = () => {

  const [pinNumber, setPinNumber] = useState(new Array(4).fill(''));
  const [childInfo, setChildInfo] = useState(null);
  const [error, setError] = useState('');


  // pin fields:
  function handlePinChange(element, index){
    if (isNaN(element.target.value)) return false;

    
    let newPin = [...pinNumber];
    newPin[index] = element.target.value;
    setPinNumber(newPin);


    // 
    if (element.target.value && element.target.nextElementSibling) {
      element.target.nextElementSibling.focus();
    }
  }

// searching for a kid:
  const handleSubmit = async(e) => {
    e.preventDefault();
    const pin = pinNumber.join('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/parent/verify-pin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin })
      })

      if(!response.ok) {
        throw new Error('Problem occured during PIN search')
      }

      const data = await response.json()
      setChildInfo(data);
      setError('');

    } catch (error) {
      setError('Invalid PIN')
    }
  }
  // sign in:
  const handleSignIn = async() => {
    
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/parent/update-status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pin: childInfo.pin, status: 'checked-in' })
        })

        if (response.ok) {
          setChildInfo({ ...childInfo, status: 'checked-in' });
          setChildInfo(null)
          toast.success('Child Signed In')
        }
      } catch (error) {
        console.log(error);
        toast.error('Error in signing in')
      }
    
  }


  //sign out:

  const handleSignOut = async() => {
    
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/parent/update-status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pin: childInfo.pin, status: 'checked-out' })
        })

        if (response.ok) {
          setChildInfo({ ...childInfo, status: 'checked-out' });
          setChildInfo(null)
          toast.success('Child Signed Out')
        }
      } catch (error) {
        console.log(error);  
        toast.error('Error in signing out')
      
    }
  }




  return (
    <div className='adminContainer'>
       <form className="isAdminForm" onSubmit={handleSubmit}>
        <div className="otp-area">
          {
            pinNumber.map((data, i)=>{
              return <input 
                        key={i}
                        type='text' 
                        value={data} 
                        onChange={(e)=>handlePinChange(e, i)}
                        maxLength={1}
                      />
            })
          }

          
        </div>

        

        {error && <p className="error">{error}</p>}

          <button 
            className='loginBtn' 
            type="submit"
            >Search</button>
      </form>
      {/* modal for displaying children */}
      {childInfo && (
        <div className="modal">
          <h3>Child Information:</h3>
          <p className='childName'>Child Name: {childInfo.childName}</p>
          <p className='childStatus'>Status: {childInfo.status}</p>
          <div className='btns-sign'>
            <button className="signIn" onClick={handleSignIn}>Sign In</button>
            <button className='signOut' onClick={handleSignOut}>Sign Out</button>
            <button onClick={() => setChildInfo(null)} className='close'>Close</button>
          </div>
          
        </div>
      )}
    </div>
  )
}

export default ParentSignIn
