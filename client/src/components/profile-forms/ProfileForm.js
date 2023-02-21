import React, { Fragment, useState, useEffect } from 'react';
import { Link, useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

/*
  NOTE: declare initialState outside of component
  so that it doesn't trigger a useEffect
  we can then safely use this to construct our profileData
 */
const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
};

const ProfileForm = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile
}) => {
  const [formData, setFormData] = useState(initialState);

  const creatingProfile = useMatch('/create-profile');

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // if there is no profile, attempt to fetch one
    if (!profile) getCurrentProfile();

    // if we finished loading and we do have a profile
    // then build our profileData
    if (!loading && profile) {
      const profileData = { ...initialState };
      for (const key in profile) {
        if (key in profileData) profileData[key] = profile[key];
      }
      for (const key in profile.social) {
        if (key in profileData) profileData[key] = profile.social[key];
      }
      // the skills may be an array from our API response
      if (Array.isArray(profileData.skills))
        profileData.skills = profileData.skills.join(', ');
      // set local state with the profileData
      setFormData(profileData);
    }
  }, [loading, getCurrentProfile, profile]);

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    const editing = profile ? true : false;
    e.preventDefault();
    createProfile(formData, editing).then(() => {
      if (!editing) navigate('/dashboard');
    });
  };

  return (
    <section className="container">
      <h1 className="large text-primary">
        {creatingProfile ? 'Napravi Profil' : 'Izmeni Profil'}
      </h1>
      <p className="lead">
        {creatingProfile
          ? ` Let's get some information to make your`
          : ' Napravi izmene na profilu'}
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={status} onChange={onChange}>
            <option>* Izaberi svoju poziciju</option>
            <option value="Golman">Golman</option>
            <option value="Štoper">Štoper</option>
            <option value="Desni Bek">Desni Bek</option>
            <option value="Levi Bek">Levi Bek</option>
            <option value="Zadnji Vezni">Zadnji Vezni</option>
            <option value="Prednji Vezni">Prednji Vezni</option>
            <option value="Vezni">Vezni</option>
            <option value="Levo Krilo">Levo Krilo</option>
            <option value="Desno Krilo">Desno Krilo</option>
            <option value="Špic">Špic</option>
          </select>
          <small className="form-text">
            Tvoja Pozicija
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Klub"
            name="company"
            value={company}
            onChange={onChange}
          />
          <small className="form-text">
            Klub za koji trenutno igraš
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={onChange}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Lokacija"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text">
            Grad i Opština (pr. Beograd, Voždovac)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Prednosti"
            name="skills"
            value={skills}
            onChange={onChange}
          />
          <small className="form-text">
          Koristi vrednosti razdvojene zarezima (pr. Brzina,Defanziva,Agilnost,Igra Glavom)
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Kratak opis tebe"
            name="bio"
            value={bio}
            onChange={onChange}
          />
          <small className="form-text">Napiši nešto o sebi</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-primary my-1"
          >
            Dodaj Linkove Društvenih Mreža
          </button>
        </div>

        {displaySocialInputs && (
          <Fragment>
            
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={onChange}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={onChange}
              />
            </div>

          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  ProfileForm
);