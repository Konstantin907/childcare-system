import React, { useEffect, useState } from 'react';
import './teachersDashboard.css';

const TeacherDashboard = () => {
  const [teachers, setTeachers] = useState([]);

  // Fetching all teachers info:
  useEffect(() => {
    const fetchTeacherInfo = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/teacher/get-all-teachers`);
        const data = await res.json();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeacherInfo();
  }, []);

  return (
    <div>
      <h2>Teachers Information</h2>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Institution</th>
            <th>Description</th>
            <th>Picture</th>
            <th>Registered At</th>
          </tr>
        </thead>

        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.firstName}</td>
              <td>{teacher.lastName}</td>
              <td>{teacher.institution}</td>
              <td>{teacher.description}</td>
              <td>
                <img src={teacher.picture} alt={`${teacher.firstName} ${teacher.lastName}`} width="50" style={{borderRadius: '50%'}}/>
              </td>
              <td>{new Date(teacher.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherDashboard;
