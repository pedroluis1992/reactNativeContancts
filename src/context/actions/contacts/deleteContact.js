import {
  DELETE_CONTACT_FAIL,
  DELETE_CONTACT_LOADING,
  DELETE_CONTACT_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosInstance';
const promiseFunction = ({id}) => {
  return new Promise((resolve, reject) => {
    resolve(id);
  });
};

export default id => dispatch => onSuccess => {
  console.log('id', id);
  dispatch({
    type: DELETE_CONTACT_LOADING,
  });

  promiseFunction(id)
    .then(() => {
      dispatch({
        type: DELETE_CONTACT_SUCCESS,
        payload: id,
      });
      onSuccess();
    })
    .catch(err => {
      dispatch({
        type: DELETE_CONTACT_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something went wrong, try again'},
      });
    });
};
