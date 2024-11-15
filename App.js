import React from 'react';
import MainNavigator from './src/navigation/MainNavigator';
import { MenuProvider } from './src/context/MenuProvider';

export default function App() {
  return (
    <MenuProvider>
      <MainNavigator />
    </MenuProvider>
  );
}