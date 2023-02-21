import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

//ovde u zagradi je ranije pisalo props, ali ga destructurisemo pa dole ne moramo da pisemo props.setAlert
const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  //da ne bi radili formData.name, destructure (pullovo) ih je out ovako
  const { name, email, password, password2 } = formData;
  //mogli smo dole samo da se pozovemo na setFormData, ali je hteo ovako da uradi,
  //zelimo da promenimo samo ime zato moramo da spreadujemo pa onda menjamo name u
  //input sa komandom name:e.target.value, ali ovako bi menjao svako name u fajlu
  //tako da i to treba da promenimo u [e.target.name] da bi koristili svuda
  const onChange = (e) =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

const onSubmit = async (e) => {
  e.preventDefault();
  if (password !== password2) {
      //danger-alert type, ubacujemo to zbog css-a pogledaj tamo
      setAlert('Šifre se ne poklapaju', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  // redirect if registered
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Register</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            minLength="6"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </section>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

//null-je moglo da bude any state that you wanna map (umesto mapStateToProps je stajalo null)
export default connect(mapStateToProps, { setAlert, register })(Register);
