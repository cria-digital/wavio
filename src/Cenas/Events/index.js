import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import TabNavigator from '../../Components/TabNavigator'
import { Background, Descricao, CinzaClaro } from '../../Styles'
import Header from '../../Components/Header'
import LinearGradient from 'react-native-linear-gradient'
import { useNavigation } from '@react-navigation/native'

import { translate } from '../../Locales'
const t = translate

import { connect } from 'react-redux';
import { toggle_tab } from '../../Redux/actions';

//Cenas
import AllEvents from './Abas/AllEvents'
import MyEvents from './Abas/MyEvents'

const index = (props) => {
	const [tab, setTab] = useState('allEvents')

	const navigation = useNavigation()

   const onToggleTab = () => {
   	if(tab == 'allEvents'){
   		setTab('myEvents')
   	} else if(tab == 'myEvents'){
   		setTab('allEvents')
   	}
   } 

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>
		<ScrollView style={{flex:1, backgroundColor: Background}}>
			<Header user={props.user} press={() => props.toggle_tab('Profile')} pressIcon={() => props.toggle_tab('Notificações')}/>
			<View style={{flexDirection: 'row', flex: 1, marginHorizontal: 30}}>
				<TouchableOpacity style={{ flex: 1}} onPress={() => onToggleTab()}>
					<Text style={styles.txtEvents}>
						{t("Todos os eventos")}
					</Text>
					{
						tab == 'allEvents' ? <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#eba358', '#df1884']} style={{flex: 1}} /> 
						: <View style={{borderColor: CinzaClaro, borderWidth: 1, flex: 1}} />
					}
				</TouchableOpacity>
					
				<TouchableOpacity style={{ flex: 1}} onPress={() => onToggleTab()}>
					<Text style={styles.txtEvents}>
					  {t("Meus eventos")}
					</Text>
					{
						tab == 'myEvents' ? <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#eba358', '#df1884']} style={{flex: 1, height: 2}} /> 
						: <View style={{borderColor: CinzaClaro, borderWidth: 1, flex: 1}} />
					}
				</TouchableOpacity>
			</View>
			{
				tab == 'allEvents' ? 
					<AllEvents
						evento={(evento) => navigation.navigate('DetailEvent', {item: evento})} 
						eventos={props.events}
					/> 
				: 
					<MyEvents
						user={props.user} 
						press={() => navigation.navigate('CreateEvent')}
						evento={(evento) => navigation.navigate('DetailEvent', {item: evento})}
					/>
			}
		</ScrollView>
		<TabNavigator focused={'Events'} callback={(value) => props.toggle_tab(value)}/>
		</SafeAreaView>	
	)
}

const styles = StyleSheet.create({
	txtEvents: {
		color: 'white', 
		textAlign: 'center', 
		marginBottom: 15,
		fontFamily : Descricao,
		fontSize: 14
	}
})

const mapStateToProps = (state) => {
   const { user } = state.Auth;
   const { events } = state.Events;
   return { user, events };
};

export default connect(mapStateToProps, { toggle_tab })(index);
