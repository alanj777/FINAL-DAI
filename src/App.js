import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MenuProvider } from './context/MenuContext';
import HomeScreen from './screens/HomeScreen';
import DishDetail from './components/DishDetail';

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <MenuProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="DishDetail" component={DishDetail} />
                </Stack.Navigator>
            </NavigationContainer>
        </MenuProvider>
    );
};

export default App;
