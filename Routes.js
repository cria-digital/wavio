import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//signOut
import Onbord from "./src/Cenas/Onboarding"
import Subscribe from "./src/Cenas/Login/Subscribe"
import Login from "./src/Cenas/Login"
import TermsOfUse from "./src/Cenas/Login/TermsOfUse"
import ForgotPassword from "./src/Cenas/Login/ForgotPassword"

//InitialRoute
import RootStack from "./src/Cenas/RootStack"

//AwesomeAccess 
import AddPhotos from "./src/Cenas/FirstAccess/AddPhotos"
import EnableLocation from "./src/Cenas/FirstAccess/EnableLocation"
import MyInterests from "./src/Cenas/FirstAccess/MyInterests"
import Welcome from "./src/Cenas/FirstAccess/Welcome"

//signIn
import RootTabs from "./src/Cenas/RootTabs"


const Stack = createNativeStackNavigator();

export const SignedOutRoutes = ({navigation}) => {
   return (
      <Stack.Navigator initialRouteName="Onbord" screenOptions={{headerShown: false}}>
         <Stack.Screen name="Onbord" component={Onbord} />
         <Stack.Screen name="Subscribe" component={Subscribe} />
         <Stack.Screen name="Login" component={Login} />
         <Stack.Screen name="TermsOfUse" component={TermsOfUse} />
         <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
   );
}

export const AwesomeAccess = ({navigation}) => {
   return (
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
         <Stack.Screen name="AddPhotos" component={AddPhotos} />
         <Stack.Screen name="Welcome" component={Welcome} />
         <Stack.Screen name="EnableLocation" component={EnableLocation} />
         <Stack.Screen name="MyInterests" component={MyInterests} />
      </Stack.Navigator>
   );
}

export const SignedInRoutes = ({navigation}) => {
   return (
      <Stack.Navigator initialRouteName="RootTabs" screenOptions={{headerShown: false}}>
         <Stack.Screen name="RootTabs" component={RootTabs} />
      </Stack.Navigator>
   );
}

export const InitialRoutes = ({navigation}) => {
   return (
      <Stack.Navigator initialRouteName="RootStack" screenOptions={{headerShown: false}}>
         <Stack.Screen name="RootStack" component={RootStack} />
      </Stack.Navigator>
   );
}