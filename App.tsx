import React from 'react';
import {ThemeProvider} from 'react-native-elements';
import './config/firebase';
import {NavigationContainer} from "@react-navigation/native";
import WelcomeScreen from "./screens/Welcome";
import UserSpace from "./screens/UserSpace";
import AdminLoginPage from "./screens/AdminLoginPage";
import NavTabAdmin from "./screens/NavTabAdmin";
import NavTabUser from "./screens/NavTabUser";
import {createStackNavigator} from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
    return (
        <ThemeProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Welcome Page" component={WelcomeScreen}/>
                    <Stack.Screen name="Test User Page" component={UserSpace}/>
                    <Stack.Screen name="Admin User Page" component={AdminLoginPage}/>
                    <Stack.Screen name="Admin Panel Space" component={NavTabAdmin}/>
                    <Stack.Screen name="Test User Panel Space" component={NavTabUser}/>
                </Stack.Navigator>
            </NavigationContainer>
        </ThemeProvider>
    );
}