//treba nam useEffect jer cim se ovaj profil ucita, we need to call that getProfiles action that we created in profile/actions
import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
//connectujemo componentu za redux-store
import { connect } from "react-redux";
//while the profiles are loading we wanna show spinner
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  return (
    <section className="container">
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Fudbaleri</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop" /> Traži i spoji se sa fudbalerima
          </p>
          <div className="profiles">
            {/* ovde zelimo da mapujemo kroz profile i autputujemo svaki pojedinacno */}
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>Nije pronadjen nijedan profil...</h4>
            )}
          </div>
        </Fragment>
      )}
    </section>
  );
};

//Profiles.propTypes ensure that the getProfiles and profile props are passed to the Profiles component correctly, and to help catch any potential errors related to incorrect prop types.
//isRequired is a validator for React prop types that specifies that a prop is required for a component to function properly.
Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

//The mapStateToProps function is used to map the Redux state to the props of the Profiles component. In this case, it maps the profile state from the Redux store to the profile prop of the Profiles component.
const mapStateToProps = (state) => ({
  profile: state.profile
});

//treba nam mapStateToProps jer nam treba profile states
//akcija getProfiles fethcuje listu profila sa beka
export default connect(mapStateToProps, { getProfiles })(Profiles);
