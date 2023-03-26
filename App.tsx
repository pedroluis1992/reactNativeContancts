/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import AppNavContainer from './src/navigations';
import GlobalProvider from './src/context/Provider';

function App(): JSX.Element {
  return (
    <GlobalProvider>
      <AppNavContainer />
    </GlobalProvider>
  );
}

export default App;
