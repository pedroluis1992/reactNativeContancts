import React, {useContext, useEffect, useRef, useState} from 'react';
import createContact from '../../context/actions/contacts/createContact';
import CreateContactComponent from '../../components/CreateContactComponent';
import {GlobalContext} from '../../context/Provider';
import {useNavigation, useRoute} from '@react-navigation/native';
import {CONTACTS_DETAIL, CONTACTS_LIST} from '../../constants/routesNames';
import uploadImage from '../../helpers/uploadImage';
import countryCodes from '../../utils/countryCodes';
import editContact from '../../context/actions/contacts/editContact';

const CreateContact = () => {
  console.log(GlobalContext);
  const {
    contactsDispatch,
    contactsState: {
      createContacts: {loading, error},
    },
  } = useContext(GlobalContext);

  const sheetRef = useRef(null);
  const [form, setForm] = useState({});
  const [uploading, setIsUploading] = useState(false);
  const {navigate, setOptions} = useNavigation();
  const {params} = useRoute();

  const [localFile, setLocalFile] = useState(null);

  useEffect(() => {
    if (params?.contact) {
      setOptions({title: 'Update contact'});
      const {
        first_name: firstName,
        phone_number: phoneNumber,
        last_name: lastName,
        is_favorite: isFavorite,
        country_code: countryCode,
      } = params?.contact;

      setForm(prev => {
        return {
          ...prev,
          firstName,
          isFavorite,
          phoneNumber,
          lastName,
          phoneCode: countryCode,
        };
      });

      const country = countryCodes.find(item => {
        return item.value.replace('+', '') === countryCode;
      });

      if (country) {
        setForm(prev => {
          return {
            ...prev,
            countryCode: country.key.toUpperCase(),
          };
        });
      }

      if (params?.contact?.contact_picture) {
        setLocalFile(params?.contact.contact_picture);
      }
    }
  }, []);

  const onChangeText = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  const onSubmit = () => {
    if (params?.contact) {
      if (localFile?.size) {
        setIsUploading(true);
        uploadImage(localFile)(url => {
          setIsUploading(false);
          editContact(
            {...form, contactPicture: url},
            params?.contact.id,
          )(contactsDispatch)(item => {
            navigate(CONTACTS_DETAIL, {item});
          });
        })(err => {
          console.log('err :>> ', err);
          setIsUploading(false);
        });
      } else {
        editContact(form, params?.contact.id)(contactsDispatch)(item => {
          navigate(CONTACTS_DETAIL, {item});
        });
      }
    } else {
      if (localFile?.size) {
        setIsUploading(true);
        uploadImage(localFile)(url => {
          setIsUploading(false);
          createContact({...form, contactPicture: url})(contactsDispatch)(
            () => {
              navigate(CONTACTS_LIST);
            },
          );
        })(err => {
          setIsUploading(false);
        });
      } else {
        createContact(form)(contactsDispatch)(() => {
          navigate(CONTACTS_LIST);
        });
      }
    }
  };

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };
  const toggleValueChange = () => {
    setForm({...form, isFavorite: !form.isFavorite});
  };

  const onFileSelected = image => {
    closeSheet();
    setLocalFile(image);
  };
  return (
    <CreateContactComponent
      onSubmit={onSubmit}
      onChangeText={onChangeText}
      form={form}
      setForm={setForm}
      loading={loading || uploading}
      toggleValueChange={toggleValueChange}
      error={error}
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      openSheet={openSheet}
      onFileSelected={onFileSelected}
      localFile={localFile}
    />
  );
};

export default CreateContact;
