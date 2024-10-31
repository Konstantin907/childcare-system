import React, { useState } from 'react'
import './home.css'
import ParentModal from '../../components/modals/ParentModal';
import TeacherModal from '../../components/modals/tercherModal/TeacherModal';
import { useUser } from '../../ContextUser';

const Home = () => {

    const [parentModalState, setParentModalState] = useState(false);
    const [teacherModal, setTeacherModal] = useState(false);
    
  return (
    <div className='homeContainer'>
      <div className='homeHeading'>
        <h1 className="homeHeadingText">
            Childcare System
        </h1>
        <p className='choosing'>Choose registering purpose:</p>
      </div>

      {/* Register Labels */}
      <div className="buttonModals">
        <button 
            className="parent btn"
            onClick={()=>setParentModalState(!parentModalState)}
        >Parent/Guardian</button>
        {/* parent modal */}

        {
            parentModalState && (
                <ParentModal setParentModalState={setParentModalState}/>
            )
        }

        <button 
          className="teacher btn" onClick={()=>setTeacherModal(!teacherModal)}>
            Teacher</button>
        {/* teacher modal */}

        {
          teacherModal && (
            <TeacherModal setTeacherModal={setTeacherModal}/>
          )
        }

       
      </div>
    </div>
  )
}

export default Home
