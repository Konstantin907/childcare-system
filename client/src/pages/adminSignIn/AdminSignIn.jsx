import React, { useState } from 'react'
import './adminSignIn.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUser } from '../../ContextUser';

const AdminSignIn = () => {

  const [pinNumber, setPinNumber] = useState(new Array(4).fill(''));
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('')
  const { login, isLoggedIn } = useUser();

  const navigate = useNavigate();

  const fetchUser = async() => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`,{
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          email,  
          pin: pinNumber.join('')
        })
      });

      if(!res.ok){
        const errorData = await res.json()
        setError(errorData.message || 'Login failed');
        return;
      }

      const data = await res.json();
      login();
      setMessage(data.message);

      navigate('/sign-in-type');
      toast.success('Successful, Welcome Admin!')

    } catch (error) {
      setError('An error occurred. Please try again later.');
      toast.error('Sorry error occured')
    }
  }




  // 
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUser();
  };



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

  // parent btn:
  const handleParentNav = () => {
    navigate('/parent-sign-in')
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

        <div className='otherInputs'>
          <label htmlFor="">Enter Admin Email:</label>
          <input 
          value={email}
          type="email"  
          placeholder='@example.com'
          className='emailInput'
          onChange={(e)=>setEmail(e.target.value)}
        />
        </div>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}

          <button 
            className='loginBtn' 
            type="submit"
            >Login To Admin Platform</button>

            <button 
              className="parentBtn"
              onClick={handleParentNav}
              >Login As A Parent</button>
      </form>
          
      
    </div>
  )
}


export default AdminSignIn
