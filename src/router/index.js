import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import {Home, DetailPrice, News} from '../screens'
import {theme} from '../utils/styles'

const Stack = createNativeStackNavigator()

const Router = () => {
  return (
    <Stack.Navigator initialRouteName="Home" headerShown={false}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          statusBarColor: theme.statusBarColor,
        }}
      />
      <Stack.Screen
        name="Detail Price"
        component={DetailPrice}
        options={{
          headerShown: false,
          statusBarColor: theme.statusBarColor,
        }}
      />
      <Stack.Screen
        name="News"
        component={News}
        options={{
          headerShown: false,
          statusBarColor: theme.statusBarColor,
        }}
      />
    </Stack.Navigator>
  )
}

export default Router
