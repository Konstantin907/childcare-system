import React,{ useState } from 'react'
import './navbar.css'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../ContextUser';

const Navbar = () => {

    const { isLoggedIn, logout, login } = useUser();
   const navigate = useNavigate();
   

    const handleLogout = async() => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
            });

            if(!res.ok){
                throw new Error('Logout failed')
            }

           logout();
            navigate('/');
            toast.success('Logout successful')
        } catch (error) {
            console.log(error);
            toast.error('Error occured during logout')
        }
    }
    

  return (
    <div className='navbarContainer'>
      
      <Link to={'/sign-in-type'} className='logoLink'>
        <h1 className="logo">Childcare</h1>
      </Link>
        
        {
                isLoggedIn && (
                    <div className='navbarBtn'>
                     <button className="logout" onClick={handleLogout}>
                        Admin Logout
                    </button>
                    <Link to='/admin-dashboard'>
                        <button className="logout">
                            Dashboard
                        </button>
                    </Link>

                    <Link to='/admin-dashboard/teachers'>
                        <button className="logout">
                            Teachers
                        </button>
                    </Link>
                    
                    </div>
                    
                )
            }
            
           
        
        
      
    </div>
  )
}

export default Navbar
