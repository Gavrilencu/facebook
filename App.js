import React from 'react';
import { Login } from './comp/Login';
import { Register } from './comp/Register';
import { Home } from './comp/Home';
// App.js
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from './comp/AppContext';
import Chat from './comp/Chat';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <AppProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Chat" component={Chat} />
                </Stack.Navigator>
            </NavigationContainer>
        </AppProvider>
    );
}
