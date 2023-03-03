import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className='dash-buttons'>
      <Link to='/edit-profile' className='btn btn-light'>
        <i className='fas fa-user-circle text-primary' /> Izmeni Profil
      </Link>
      <Link to='/add-experience' className='btn btn-light'>
        <i className='fas fa-futbol text-primary' /> Dodaj Iskustvo
      </Link>
      {/* <Link to='/add-education' className='btn btn-light'>
        <i className='fas fa-graduation-cap text-primary' /> Add Education
      </Link> */}
    </div>
  );
};

export default DashboardActions;
