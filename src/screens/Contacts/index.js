import React, {useContext, useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Container from '../../components/common/Container';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import Icon from '../../components/common/Icon';
import ContactsComponent from '../../components/ContactsComponent';
import {GlobalContext} from '../../context/Provider';
import {navigate} from '../../navigations/SideMenu/RootNavigator';
import {CONTACTS_DETAIL} from '../../constants/routesNames';
import getContacts from '../../context/actions/contacts/getContacts';

const Contacts = navigation => {
  const [sortBy, setSortBy] = React.useState(null);
  const {setOptions, toggleDrawer} = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const contactsRef = useRef([]);
  const {
    contactsDispatch,
    contactsState: {
      getContacts: {data, loading},
    },
  } = useContext(GlobalContext);

  const getSettings = async () => {
    const sortPref = await AsyncStorage.getItem('sortBy');
    if (sortPref) {
      setSortBy(sortPref);
    }
  };

  useEffect(() => {
    getContacts()(contactsDispatch);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getSettings();
      return () => {};
    }, []),
  );

  useEffect(() => {
    const prev = contactsRef.current;

    contactsRef.current = data;

    const newList = contactsRef.current;
    console.log(newList.length, prev.length, data, 'TEST');
    if (newList.length - prev.length === 1) {
      const newContact = newList.find(
        item => !prev.map(i => i.id).includes(item.id),
      );
      console.log('ene el if', newContact);
      navigate(CONTACTS_DETAIL);
    }
  }, [data.length]);

  React.useEffect(() => {
    setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            toggleDrawer();
          }}>
          <Icon type="material" style={{padding: 10}} size={25} name="menu" />
        </TouchableOpacity>
      ),
    });
  }, []);
  return (
    <ContactsComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      data={data}
      loading={loading}
    />
  );
};

export default Contacts;
