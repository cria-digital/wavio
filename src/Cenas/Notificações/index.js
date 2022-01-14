import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { Background, Titulo } from '../../Styles'
import Header from '../../Components/Header'
import TabNavigator from '../../Components/TabNavigator'

import { translate } from '../../Locales'
const t = translate

import { connect } from 'react-redux';
import { toggle_tab } from '../../Redux/actions';

const index = (props) => {
	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>
			<Header user={props.user} press={() => props.toggle_tab('Profile')} pressIcon={() => navigation.navigate('Notificacoes')}/>
			<Text style={{color: 'white', fontFamily: Titulo, fontSize: 28, paddingLeft: 30, paddingTop: 7}}>
				{t("Notificações")}
			</Text>
			<View style={{height: 130}}/>	
			<TabNavigator  callback={(value) => props.toggle_tab(value)}/>
		</SafeAreaView>
	)
}


const mapStateToProps = (state) => {
	const { user } = state.Auth;
   const { active_tab } = state.Tabs;
   return { active_tab, user };
};

export default connect(mapStateToProps, { toggle_tab })(index);
