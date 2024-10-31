import React, { useEffect, useState } from 'react'
import './adminDashboard.css'

const AdminDashboard = () => {

    const [parents, setParents] = useState([]);

    // fetch here parents and kids:
    useEffect(()=> {
        const fetchParentInfo = async() => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/parent/getAll`)
                const data = await res.json();
                setParents(data);
                console.log(parents);
                
            } catch (error) {
                console.error("Error fetching parents:", error);
            }
        }

        fetchParentInfo();
    }, []);

  return (
    <div>
      <h2>Parents Information</h2>
      <table>
        <thead>
          <tr>
            <th>First Parent Name</th>
            <th>First Parent Last Name</th>
            <th>Second Parent Name</th>
            <th>Second Parent Last Name</th>
            <th>Child First Name</th>
            <th>Child Last Name</th>
            <th>Child Age</th>
            <th>Institution</th>
            <th>PIN</th>
            <th>Email</th>
            <th>Status</th>
            <th>Check-In Time</th>
            <th>Check-Out Time</th>
            <th>Registration Date</th>
          </tr>
        </thead>
        <tbody>
          {parents.map((parent) => (
            <tr key={parent._id}>
              <td>{parent.firstParentName}</td>
              <td>{parent.firstParentLastName}</td>
              <td>{parent.secondParentName || 'N/A'}</td>
              <td>{parent.secondParentLastName || 'N/A'}</td>
              <td>{parent.childFirstName}</td>
              <td>{parent.childLastName}</td>
              <td>{parent.childAge}</td>
              <td>{parent.institution.join(', ')}</td>
              <td>{parent.pin}</td>
              <td>{parent.email}</td>
              <td>{parent.status}</td>
              <td>{parent.checkInTime ? new Date(parent.checkInTime).toLocaleString() : 'N/A'}</td>
              <td>{parent.checkOutTime ? new Date(parent.checkOutTime).toLocaleString() : 'N/A'}</td>
              <td>{new Date(parent.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminDashboard
