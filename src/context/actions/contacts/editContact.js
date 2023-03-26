import {
  EDIT_CONTACT_FAIL,
  EDIT_CONTACT_LOADING,
  EDIT_CONTACT_SUCCESS,
} from '../../../constants/actionTypes';
import axios from '../../../helpers/axiosInstance';
const promiseFunction = ({
  country_code,
  first_name,
  last_name,
  phone_number,
  contact_picture,
  is_favorite,
}) => {
  return new Promise((resolve, reject) => {
    const data = {
      contact_picture: contact_picture,
      country_code: country_code,
      first_name: first_name,
      is_favorite: is_favorite,
      last_name: last_name,
      phone_number: phone_number,
    };
    resolve(data);
  });
};

export default (form, id) => dispatch => onSuccess => {
  const requestPayload = {
    country_code: form.phoneCode || '',
    first_name: form.firstName || '',
    last_name: form.lastName || '',
    phone_number: form.phoneNumber || '',
    contact_picture: form.contactPicture || null,
    is_favorite: form.isFavorite || false,
    id: id,
  };

  console.log('requestPayload :>> ', requestPayload);
  dispatch({
    type: EDIT_CONTACT_LOADING,
  });

  promiseFunction(requestPayload)
    .then(res => {
      dispatch({
        type: EDIT_CONTACT_SUCCESS,
        payload: res,
      });

      onSuccess(res);
    })
    .catch(err => {
      console.log('err', err);
      dispatch({
        type: EDIT_CONTACT_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something went wrong, try again'},
      });
    });
};
