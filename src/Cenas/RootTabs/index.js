import React, {useState} from 'react'
import { View } from 'react-native' 
import { Home, Chats, Events, Profile, Hangouts, Notificacoes } from "./Tabs"

import { connect } from 'react-redux';

const index = (props) => {
	const expr = props.active_tab
   switch (expr) {
      case 'Home':
         return <Home />
      break;
      case 'Chats':
         return <Chats />
      break;
      case 'Events':
         return <Events />
      break;
      case 'Profile':
         return <Profile />
      break;
      case 'Hangouts':
         return <Hangouts />
      break;
      case 'Notificações':
         return <Notificacoes />
      break;
      default: return <Home/>
   }
}


const mapStateToProps = (state) => {
   const { active_tab } = state.Tabs;
   return { active_tab };
};

export default connect(mapStateToProps)(index);

