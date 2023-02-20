import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';


const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //da ne bi radili formData.name, destructure (pullovo) ih je out ovako
  const { email, password } = formData;
  //mogli smo dole samo da se pozovemo na setFormData, ali je hteo ovako da uradi,
  //zelimo da promenimo samo ime zato moramo da spreadujemo pa onda menjamo name u
  //input sa komandom name:e.target.value, ali ovako bi menjao svako name u fajlu
  //tako da i to treba da promenimo u [e.target.name] da bi koristili svuda
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
      e.preventDefault();
      login(email, password);
    };

  // redirect if logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="container">
      <h1 className="large text-primary">Login</h1>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
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

        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </section>
  );
};

// propTypes used to define the expected types of props that are passed to the component, u ovom slucaju kao prop login funkciju i isAuth
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

//ova funkcija nam daje sve iz auth.js/reducers, iz initialState-a, a nama treba samo isAuthenticated
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
