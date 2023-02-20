//dosta se razlikuje na gitu
// ovde cemo da fetchujemo svu data using action and bring it in from the redux state and
// then pass it down to other components (expirience, education..)

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  //ovo sa spinerom radimo jer ne zelimo da prikazujemo aplikaciju dok ne dobijemo profil podatke od servera
  return (
    <section className="container">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        {/* ovim user proveravamo da li je user tu, i to cemo da pullujemo od auth (jer auth ima user u sebi) */}
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          {/* pass in experience array */}
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus" /> Delete My Account
            </button>
          </div>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </section>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

//mapStateToProps, which is a way to connect the application state managed by Redux to a React component
//Once this function is defined, it can be passed as an argument to the connect function provided by the React-Redux library,
//which creates a higher-order component that connects the state to the React component.
//The resulting component can access the auth and profile props that are passed in by the mapStateToProps function.
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
