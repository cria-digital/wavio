import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'
import TabNavigator from '../../Components/TabNavigator'
import { Background, CinzaEscuro, Placeholder, Primary, Descricao, CinzaClaro } from '../../Styles';
import LinearGradient from 'react-native-linear-gradient'
import { Searchbar } from 'react-native-paper';
import Header from '../../Components/Header'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

import { translate } from '../../Locales'
const t = translate

//Abas
import Conversas from './Abas/Conversas'
import Eventos from './Abas/Eventos'
import Seguindo from './Abas/Seguindo'

import { connect } from 'react-redux';
import { toggle_tab } from '../../Redux/actions';

const index = (props) => {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [token, setToken] = useState("")

  	const onChangeSearch = query => setSearchQuery(query);

  	const isFocused = useIsFocused();

  	const navigation = useNavigation();

  	const [tab, setTab] = useState('Conversas')
   
   const onToggleTab = (aba) => {
   	setTab(aba)
   } 

   useEffect(async() => {
		getToken().then(resp => setToken(resp))
	}, [])

	const getToken = async () => {
	  	try {
	    	const value = await AsyncStorage.getItem('userToken')
	   	return value
	  	} catch(e) {
	    	// error reading value
	  	}
	}

   const renderAba = () => {
   	if(tab == 'Conversas'){
   		return(
   			<Conversas 
   				chat={(item) => navigation.navigate('Conversa', {item: JSON.stringify(item), user_id: props.user._id, token: token})}
   				user={props.user}
   				foco={isFocused}
   			/>
   		)
   	}else if(tab == 'Eventos'){
   		return(
   			<Eventos 
   				press={(item) => navigation.navigate("TalkEvent", { event: item, user_id: props.user.id, token: token })}
   				foco={isFocused}
   			/>
   		)
   	}else if(tab == 'Seguindo'){
   		return(
   			<Seguindo 
   				press={(targetId) => navigation.navigate("Talk", {user_id: props.user.id, send_id: targetId, token: token})}
   				foco={isFocused}
   				user={props.user}
   			/>
   		)
   	}
   }

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>
			<Header user={props.user} press={() => props.toggle_tab('Profile')}/>
			<Searchbar
				placeholder={t("Pesquisar")}
				onChangeText={onChangeSearch}
				value={searchQuery}
				style={{marginHorizontal: 30, backgroundColor: CinzaEscuro, height: 45}}
				theme={{roundness: 10, colors: { text: Primary, primary: "white", placeholder: Placeholder } }}
			/>
			<View style={{flexDirection: 'row', marginHorizontal: 30, paddingTop: 20}}>
				<TouchableOpacity style={{ flex: 1}} onPress={() => onToggleTab('Conversas')}>
					<Text style={styles.txtEvents}>
						{t("Conversas")}
					</Text>
					{
						tab == 'Conversas' ? <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#eba358', '#df1884']} style={{flex: 1}} /> 
						: <View style={{borderColor: CinzaClaro, borderWidth: 1, flex: 1}} />
					}
					
				</TouchableOpacity>
					
				<TouchableOpacity style={{ flex: 1}} onPress={() => onToggleTab('Eventos')}>
					<Text style={styles.txtEvents}>
					   {t("Eventos")}
					</Text>
					{
						tab == 'Eventos' ? <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#eba358', '#df1884']} style={{flex: 1, height: 2}} /> 
						: <View style={{borderColor: CinzaClaro, borderWidth: 1, flex: 1}} />
					}
				</TouchableOpacity>

				<TouchableOpacity style={{ flex: 1}} onPress={() => onToggleTab('Seguindo')}>
					<Text style={styles.txtEvents}>
					   {t("Seguindo")}
					</Text>
					{
						tab == 'Seguindo' ? <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#eba358', '#df1884']} style={{flex: 1, height: 2}} /> 
						: <View style={{borderColor: CinzaClaro, borderWidth: 1, flex: 1}} />
					}
				</TouchableOpacity>
			</View>
			{renderAba()}
			<TabNavigator focused={'Chats'} callback={(value) => props.toggle_tab(value)}/>
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
   return { user };
};

export default connect(mapStateToProps, { toggle_tab })(index);