import {
  REGISTER_FAIL,
  REGISTER_LOADING,
  REGISTER_SUCCESS,
  CLEAR_AUTH_STATE,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';

const promiseFunction = (email, password, username, firstName, lastName) => {
  return new Promise((resolve, reject) => {
    const data = {
      data: {
        email: email,
        firstName: firstName,
        username: username,
        lastName: lastName,
      },
    };
    resolve(data);
  });
};

export const clearAuthState = () => dispatch => {
  dispatch({
    type: CLEAR_AUTH_STATE,
  });
};

export default ({
    email,
    password,
    userName: username,
    firstName: first_name,
    lastName: last_name,
  }) =>
  dispatch =>
  onSuccess => {
    dispatch({
      type: REGISTER_LOADING,
    });
    promiseFunction(email, password, username, first_name, last_name)
      // axiosInstance
      //   .post('auth/register', {
      //     email,
      //     password,
      //     username,
      //     first_name,
      //     last_name,
      //   })
      .then(res => {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: res.data,
        });

        onSuccess(res.data);
      })
      .catch(err => {
        dispatch({
          type: REGISTER_FAIL,
          payload: err.response
            ? err.response.data
            : {error: 'Something went wrong, try agin'},
        });
      });
  };

// export default ({
//     email,
//     password,
//     userName: username,
//     firstName: first_name,
//     lastName: last_name,
//   }) =>
//   dispatch =>
//   onSuccess => {
//     dispatch({
//       type: REGISTER_LOADING,
//     });
//     axiosInstance
//       .post('auth/register', {
//         email,
//         password,
//         username,
//         first_name,
//         last_name,
//       })
//       .then(res => {
//         dispatch({
//           type: REGISTER_SUCCESS,
//           payload: res.data,
//         });

//         onSuccess(res.data);
//       })
//       .catch(err => {
//         dispatch({
//           type: REGISTER_FAIL,
//           payload: err.response
//             ? err.response.data
//             : {error: 'Something went wrong, try agin'},
//         });
//       });
//   };
