import {
  CREATE_CONTACT_FAIL,
  CREATE_CONTACT_LOADING,
  CREATE_CONTACT_SUCCESS,
} from '../../../constants/actionTypes';
const promiseFunction = ({
  country_code,
  first_name,
  last_name,
  phone_number,
  contact_picture,
  is_favorite,
}) => {
  return new Promise((resolve, reject) => {
    let min = 10000;
    let max = 30000;

    let id = Math.floor(Math.random() * (max - min + 1) + min);
    const data = {
      contact_picture: contact_picture,
      country_code: country_code,
      first_name: first_name,
      id: id,
      is_favorite: is_favorite,
      last_name: last_name,
      phone_number: phone_number,
    };
    resolve(data);
  });
};

export default form => dispatch => onSuccess => {
  const requestPayload = {
    country_code: form.phoneCode || '',
    first_name: form.firstName || '',
    last_name: form.lastName || '',
    phone_number: form.phoneNumber || '',
    contact_picture: form.contactPicture || null,
    is_favorite: form.isFavorite || false,
  };

  dispatch({
    type: CREATE_CONTACT_LOADING,
  });
  promiseFunction(requestPayload)
    .then(res => {
      dispatch({
        type: CREATE_CONTACT_SUCCESS,
        payload: res,
      });

      onSuccess();
    })
    .catch(err => {
      dispatch({
        type: CREATE_CONTACT_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something went wrong, try again'},
      });
    });
};
