import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  CONTACTS_DETAIL,
  CONTACTS_LIST,
  CREATE_CONTACT,
  SETTINGS,
} from '../constants/routesNames';
import Contacts from '../screens/Contacts';
import ContactDetail from '../screens/ContactDetail';
import CreateContact from '../screens/CreateContact';
import Settings from '../screens/Settings';

const HomeNavigator = () => {
  const HomeStack = createStackNavigator();
  return (
    <HomeStack.Navigator initialRouteName={CONTACTS_LIST}>
      <HomeStack.Screen name={CONTACTS_LIST} component={Contacts} />
      <HomeStack.Screen name={CONTACTS_DETAIL} component={ContactDetail} />
      <HomeStack.Screen name={CREATE_CONTACT} component={CreateContact} />
      <HomeStack.Screen name={SETTINGS} component={Settings} />
    </HomeStack.Navigator>
  );
};

export default HomeNavigator;
