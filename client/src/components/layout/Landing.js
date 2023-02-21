import React from "react";
import { Link, Navigate } from 'react-router-dom';
//moramo da se konektujemo jer treba da interaktujemo sa stejtom da vidimo jel smo loginovani ili ne
//ovo radimo da kad smo loginovani da ne bi mogli da pristupimo landing pageu
import { connect } from "react-redux";
import PropTypes from "prop-types";

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Spajanje fudbalskog ekosistema</h1>
          <p className="lead">
            Napravi svoj fudbalski profil/CV, započni diskusiju oko tema u fudbalu, budi dostupan
            klubovima i agentima, ažuriraj i obaveštavaj ih o kretanjima u tvojoj karijeri.
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

//ovo i konekt, sve radimo da bi mogli da iskoristimo isAuthenticated
Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
