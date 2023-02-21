import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
const AddExperience = ({ addExperience }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    location: '',
    from: '',
    to: '',
    //if the current is true we need 'to' disabled
    current: false,
    description: "",
  });
  // const [toDateDisabled, toggleDisabled] = useState(false);
  const { company, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section className="container">
      <h1 className="large text-primary">Dodaj Iskustvo</h1>
      <p className="lead">
      Dodaj sve klubove u kojima si igrao
      </p>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          addExperience(formData).then(() => navigate('/dashboard'));
        }}
      >
        
        <div className="form-group">
          <input
            type="text"
            placeholder="* Klub"
            name="company"
            value={company}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Lokacija"
            name="location"
            value={location}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <h4>Od</h4>
          <input type="date" name="from" value={from} onChange={onChange} />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              //checked prop is used to determine whether the checkbox should be displayed as checked or unchecked.
              checked={current}
              value={current}
              //   {/* ovde zelimo da disablujemo from kad je ovo pritisnuto zato se razlikuje, current: !current znaci da ako je true ide u false i obrn */}
              //toggleDisabled(!toDateDisabled) is a function that takes the current value of toDateDisabled (which is initially false) and uses the logical NOT operator (!) to toggle its value. So, the first time toggleDisabled is called, !toDateDisabled evaluates to true, which means toDateDisabled is updated to true.
              onChange={() => {
                setFormData({ ...formData, current: !current });
              }}
            />{' '}
            Trenutni Klub
          </p>
        </div>
        <div className="form-group">
          <h4>Do</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={onChange}
            //disabled prop is used to disable the checkbox when the condition specified by the toDateDisabled variable is true.
            disabled={current}
            />
          </div>
          <div className="form-group">
            <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Dodatni detalji u toku igranja u ovom klubu (opciono)..."
              value={description}
              onChange={onChange}
            />
          </div>
          <input type="submit" className="btn btn-primary my-1" />
          <Link className="btn btn-light my-1" to="/dashboard">
            Idi Nazad
          </Link>
        </form>
      </section>
    );
  };
  
  AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired
  };
  
  export default connect(null, { addExperience })(AddExperience);
