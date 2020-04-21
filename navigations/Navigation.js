import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// imports all view files
import Login from '../views/Login';
import Profile from '../views/Profile';
import Admin from '../views/Admin';
import Registration from '../views/Registration';
import AdminPersonDetails from '../views/AdminPersonDetails';

const Stack = createStackNavigator();

class Navigation extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Profile">
          <Stack.Screen
            options={{
              headerShown: false
            }} 
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Registration"
            component={Registration}
            options={{
              headerTitleAlign:"center",
              headerStyle: {
                backgroundColor: '#045fa7'
              },
              headerTitleStyle: {
                color: '#FFFFFF'
              }
            }}
          />
          <Stack.Screen
            options={{
              headerTitleAlign:"center",
              headerStyle: {
                backgroundColor: '#045fa7'
              },
              headerTitleStyle: {
                color: '#FFFFFF'
              }
            }}
            name="Profile"
            component={Profile}
          />
          <Stack.Screen
            name="AdminPersonDetails"
            options={{ title: 'Person Details' }}
            component={AdminPersonDetails}
          />
          <Stack.Screen
            name="Admin"
            options={{
              headerTitleAlign:"center",
              headerStyle: {
                backgroundColor: '#201484'
              },
              headerTitleStyle: {
                color: '#FFFFFF'
              }
            }}
            component={Admin}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default Navigation;
