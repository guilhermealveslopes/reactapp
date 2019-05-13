import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import MainScreen from './pages/main';


const RootStack = createStackNavigator(
    {
      Home: MainScreen,
    },
    {
      initialRouteName: 'Home',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#a31d36',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    }
  );
const Container = createAppContainer(RootStack);
export default Container; 