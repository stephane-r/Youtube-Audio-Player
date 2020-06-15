import React from 'react';
import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from 'react-navigation';
// @ts-ignore
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialIcons';

import LoadingScreen from '../screens/Loading';
import LoginScreen from '../screens/Login';
import DashboardScreen from '../screens/Dashboard';
import FavorisScreen from '../screens/Favoris';
import PlaylistScreen from '../screens/Playlist';
import SettingsScreen from '../screens/Settings';

const AuthenticationNavigator = createStackNavigator({
  Login: LoginScreen
});

const SettingsNavigator = createStackNavigator(
  {
    Settings: SettingsScreen
  },
  {
    headerMode: 'none'
  }
);

const AppNavigator = createMaterialBottomTabNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: any): any => (
          <Icon name="home" size={23} style={{ color: tintColor }} />
        ),
        tabBarColor: '#2575f4'
      }
    },
    Playlist: {
      screen: PlaylistScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: any): any => (
          <Icon name="headset" size={23} style={{ color: tintColor }} />
        ),
        tabBarColor: '#0455BF'
      }
    },
    Favoris: {
      screen: FavorisScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }: any): any => (
          <Icon name="favorite" size={23} style={{ color: tintColor }} />
        ),
        tabBarColor: '#EE05F2'
      }
    }
  },
  {
    shifting: true,
    headerMode: 'none'
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppNavigator,
      Settings: SettingsNavigator,
      Auth: AuthenticationNavigator
    },
    {
      initialRouteName: 'Loading'
    }
  )
);