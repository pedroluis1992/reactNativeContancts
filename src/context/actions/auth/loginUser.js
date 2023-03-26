import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  LOGIN_FAIL,
  LOGIN_LOADING,
  LOGIN_SUCCESS,
} from '../../../constants/actionTypes';
import axiosInstance from '../../../helpers/axiosInstance';

const promiseFunction = (password, username) => {
  return new Promise((resolve, reject) => {
    if (password === '12345' && username === 'pedro1992@correo.com') {
      const data = {
        data: {
          token: 'ey10eXA',
          user: {email: 'pedro1992@correo.com', userName: 'Pedro'},
        },
        error: null,
        isLoggedIn: false,
        loading: true,
      };
      resolve(data);
    } else {
      const failData = {
        data: {},
        error: 'Invalid Credentials',
        isLoggedIn: false,
        loading: true,
      };
      reject(failData);
    }
  });
};
export default ({password, userName: username}) =>
  dispatch => {
    dispatch({
      type: LOGIN_LOADING,
    });
    promiseFunction(password, username)
      .then(res => {
        console.log(res);
        AsyncStorage.setItem('token', res.data.token);
        AsyncStorage.setItem('user', JSON.stringify(res.data.user));
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        });
      })
      .catch(err => {
        dispatch({
          type: LOGIN_FAIL,
          payload: err.response
            ? err.response.data
            : {error: 'Something went wrong, try agin'},
        });
      });
  };

// export default ({password, userName: username}) =>
//   dispatch => {
//     dispatch({
//       type: LOGIN_LOADING,
//     });
//     axiosInstance
//       .post('auth/login', {
//         password,
//         username,
//       })
//       .then(res => {
//         AsyncStorage.setItem('token', res.data.token);
//         AsyncStorage.setItem('user', JSON.stringify(res.data.user));
//         dispatch({
//           type: LOGIN_SUCCESS,
//           payload: res.data,
//         });
//       })
//       .catch(err => {
//         dispatch({
//           type: LOGIN_FAIL,
//           payload: err.response
//             ? err.response.data
//             : {error: 'Something went wrong, try agin'},
//         });
//       });
//   };
