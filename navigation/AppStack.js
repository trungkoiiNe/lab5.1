import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthenticatedUserContext} from '../providers';
import {HomeScreen,ManageScreen} from '../screens';
const Stack = createStackNavigator();
export const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ManageUsers" component={ManageScreen} />
    </Stack.Navigator>
  );
};
