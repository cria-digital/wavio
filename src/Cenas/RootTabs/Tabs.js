import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Eventos
import Entry from '../Home'
import Eventos from '../Events'
import DetailEvent from '../Events/DetailEvent'
import CreateEvent from '../Events/CreateEvent'
import EditEvent from '../Events/EditEvent'
import FullMap from '../Events/FullMap'
import Talk from '../Events/Talk'
import TalkEvent from '../Events/TalkEvent'

//Conversas
import Chat from '../Chat'
import Conversa from '../Chat/Conversa'

//Perfil
import Perfil from '../Perfil'
import EditPerfil from '../Perfil/EditPerfil'
import Configuracoes from '../Perfil/Configuracoes'
import ChangePassword from '../Perfil/ChangePassword'
import Seguidores from '../Perfil/Seguidores'
import PerfilPublico from '../Perfil/PerfilPublico'
import Planos from '../Planos'

//Hangouts
import Hangout from '../Hangouts'

//Notificações
import Notificações from '../Notificações'

const Stack = createNativeStackNavigator();

export const Home = ({navigation}) => {
   return (
	   <Stack.Navigator initialRouteName="Entry" screenOptions={{headerShown: false}}>
	      <Stack.Screen name="Entry" component={Entry} />
	      <Stack.Screen name="DetailEvent" component={DetailEvent} />
         <Stack.Screen name="EditEvent" component={EditEvent} />
         <Stack.Screen name="FullMap" component={FullMap} />
         <Stack.Screen name="Talk" component={Talk} />
         <Stack.Screen name="TalkEvent" component={TalkEvent} />
	   </Stack.Navigator>
   );
}

export const Events = ({navigation}) => {
   return (
      <Stack.Navigator initialRouteName="Eventos" screenOptions={{headerShown: false}}>
         <Stack.Screen name="Eventos" component={Eventos} />
         <Stack.Screen name="CreateEvent" component={CreateEvent} />
         <Stack.Screen name="DetailEvent" component={DetailEvent} />
         <Stack.Screen name="EditEvent" component={EditEvent} />
         <Stack.Screen name="FullMap" component={FullMap} />
         <Stack.Screen name="Talk" component={Talk} />
         <Stack.Screen name="TalkEvent" component={TalkEvent} />
      </Stack.Navigator>
   );
}

export const Chats = ({navigation}) => {
   return (
      <Stack.Navigator initialRouteName="Chat" screenOptions={{headerShown: false}}>
         <Stack.Screen name="Chat" component={Chat} />
         <Stack.Screen name="Conversa" component={Conversa} />
         <Stack.Screen name="Talk" component={Talk} />
         <Stack.Screen name="TalkEvent" component={TalkEvent} />
      </Stack.Navigator>
   );
}

export const Hangouts = ({navigation}) => {
   return (
      <Stack.Navigator initialRouteName="Hangouts" screenOptions={{headerShown: false}}>
         <Stack.Screen name="Hangouts" component={Hangout} />
      </Stack.Navigator>
   );
}

export const Profile = ({navigation}) => {
   return (
      <Stack.Navigator initialRouteName="Perfil" screenOptions={{headerShown: false}}>
         <Stack.Screen name="Perfil" component={Perfil} />
         <Stack.Screen name="Seguidores" component={Seguidores} />
         <Stack.Screen name="EditPerfil" component={EditPerfil} />
         <Stack.Screen name="ChangePassword" component={ChangePassword} />
         <Stack.Screen name="Configuracoes" component={Configuracoes} />
         <Stack.Screen name="Planos" component={Planos} />
      </Stack.Navigator>
   );
}

export const Notificacoes = ({navigation}) => {
   return (
      <Stack.Navigator initialRouteName="Notificações" screenOptions={{headerShown: false}}>
         <Stack.Screen name="Notificações" component={Notificações} />
      </Stack.Navigator>
   );
}