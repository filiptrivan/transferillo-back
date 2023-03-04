// //imacemo education passed in from the parrent component koji je Dashboard.js
// //Education.js napravimo pa ga ubacimo u Dashboard.js
// import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import formatDate from '../../utils/formatDate.js';

// const Education = ({ education, deleteEducation }) => {
//   //posto ce education biti array, mappujemo kroz education, map takes in function and for each exp we will return jsx
//   const educations = education.map((edu) => (
//     <tr key={edu._id}>
//       <td>{edu.school}</td>
//       <td className="hide-sm">{edu.degree}</td>
//       <td>
//         {formatDate(edu.from)} - {edu.to ? formatDate(edu.to) : 'Now'}
//         {/* posto je moguce da bude current te da do bude null, to smo resili ovde */}
//         </td>
//       <td>
//         <button
//           //If the function needs data to perform its task, then arguments are necessary. However, if the function doesn't require any data, then there is no need for arguments.
//           onClick={() => deleteEducation(edu._id)}
//           className="btn btn-danger"
//         >
//           Obriši
//         </button>
//       </td>
//     </tr>
//   ));

//   return (
//     <Fragment>
//       <h2 className="my-2">Education Credentials</h2>
//       <table className="table">
//         <thead>
//           <tr>
//             <th>School</th>
//             <th className="hide-sm">Degree</th>
//             <th className="hide-sm">Years</th>
//             <th />
//           </tr>
//         </thead>
//         <tbody>{educations}</tbody>
//       </table>
//     </Fragment>
//   );
// };

// Education.propTypes = {
//   education: PropTypes.array.isRequired,
//   deleteEducation: PropTypes.func.isRequired
// };

// export default connect(null, { deleteEducation })(Education);
