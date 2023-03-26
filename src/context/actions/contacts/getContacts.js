import {
  GET_CONTACTS_FAIL,
  GET_CONTACTS_LOADING,
  GET_CONTACTS_SUCCESS,
} from '../../../constants/actionTypes';
const promiseFunction = () => {
  return new Promise((resolve, reject) => {
    const data = [
      {
        contact_picture: null,
        country_code: 'BR',
        first_name: 'Cantre',
        id: 828,
        is_favorite: false,
        last_name: 'Kodi',
        phone_number: '75858855',
      },
      {
        contact_picture: null,
        country_code: 'BE',
        first_name: 'Raul',
        id: 829,
        is_favorite: false,
        last_name: 'Gonzalez',
        phone_number: '58578444',
      },
      {
        contact_picture: null,
        country_code: 'BE',
        first_name: 'Luis',
        id: 830,
        is_favorite: false,
        last_name: 'Morales',
        phone_number: '854558',
      },
      {
        contact_picture: null,
        country_code: 'BR',
        first_name: 'Mario',
        id: 831,
        is_favorite: false,
        last_name: 'Martinez',
        phone_number: '47245588',
      },
    ];
    resolve(data);
  });
};

export default () => dispatch => {
  dispatch({
    type: GET_CONTACTS_LOADING,
  });
  promiseFunction()
    .then(res => {
      dispatch({
        type: GET_CONTACTS_SUCCESS,
        payload: res,
      });
    })
    .catch(err => {
      dispatch({
        type: GET_CONTACTS_FAIL,
        payload: err.response
          ? err.response.data
          : {error: 'Something went wrong, try again'},
      });
    });
};
