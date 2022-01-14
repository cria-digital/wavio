import React, { useEffect } from 'react'
import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native'
import { Background, Titulo, Primary, CinzaEscuro, Descricao, Placeholder } from '../../Styles'
import Icon from 'react-native-vector-icons/Ionicons';
import BackButtonSolid from '../../Components/Buttons/BackButtonSolid'
import { Switch } from 'react-native-paper';
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import { translate } from '../../Locales'
const t = translate

const Configuracoes = ({navigation}) => {
	const [isSwitchOn, setIsSwitchOn] = React.useState(false);
	const [isSwitchOn1, setIsSwitchOn1] = React.useState(false);
	const [isSwitchOn2, setIsSwitchOn2] = React.useState(false);
	const [isSwitchOn3, setIsSwitchOn3] = React.useState(false);


	useEffect(() => {
		Geolocation.getCurrentPosition(
			(position) => { setIsSwitchOn(true)},
        	(error) => setIsSwitchOn(false),
        	{enableHighAccuracy: true, timeout: 2000, maximumAge: 1000}
		);
	}, [])

	const onToggleSwitch = () => {
		if(isSwitchOn == true){
			setIsSwitchOn(false)
		}else{
			enableLocationHandler()
		}
	}

	const onToggleSwitch1 = () => setIsSwitchOn1(!isSwitchOn1);
	const onToggleSwitch2 = () => setIsSwitchOn2(!isSwitchOn2);
	const onToggleSwitch3 = () => setIsSwitchOn3(!isSwitchOn3);


	enableLocationHandler = () => {
   	if (Platform.OS === 'android') {
      	RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
			  interval: 10000,
			  fastInterval: 5000,
			})
			.then((data) => {
			   setIsSwitchOn(true)
			})
			.catch((err) => {
			   setIsSwitchOn(false)
			});
    	} else {
      	Linking.openURL('app-settings:');
    	}
  	}

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>
			<ScrollView style={{flex: 1, backgroundColor: Background}}>
				<View style={{paddingLeft: 30, paddingTop: 30}}>
					<BackButtonSolid  callback={() => navigation.goBack()}/>
				</View>
				<Text style={{color: 'white', fontFamily: Titulo, fontSize: 28, padding: 30}}>
					{t("Configurações")}
				</Text>
				<View style={{paddingHorizontal: 30}}>
					<View style={{flexDirection: 'row', paddingTop: 20}}>
						<View style={styles.container}>
							<Icon name="videocam-outline" size={30} color={'#848484'} />
							<Text style={{color: 'white', paddingLeft: 7}}>
							  	{t("Hangouts")}
							</Text>
						</View>
						<View style={{flex: 2, alignItems: 'flex-end'}}>
							<Switch value={isSwitchOn1} onValueChange={onToggleSwitch1} />
						</View>
					</View>
					<View style={{flexDirection: 'row', paddingTop: 20}}>
						<View style={styles.container}>
							<Icon name="reader-outline" size={30} color={'#848484'} />
							<Text style={{color: 'white', paddingLeft: 7}}>
							  	{t("Notificações de eventos")}
							</Text>
						</View>
						<View style={{flex: 2, alignItems: 'flex-end'}}>
							<Switch value={isSwitchOn2} onValueChange={onToggleSwitch2} />
						</View>
					</View>
					<View style={{flexDirection: 'row', paddingTop: 20}}>
						<View style={styles.container}>
							<Icon name="people-outline" size={30} color={'#848484'} />
							<Text style={{color: 'white', paddingLeft: 7}}>
							  	{t("Notificações de amigos")}
							</Text>
						</View>
						<View style={{flex: 2, alignItems: 'flex-end'}}>
							<Switch value={isSwitchOn3} onValueChange={onToggleSwitch3} />
						</View>
					</View>
					<View style={{flexDirection: 'row', paddingTop: 20}}>
						<View style={styles.container}>
							<Icon name="location-outline" size={30} color={'#848484'} />
							<Text style={{color: 'white', paddingLeft: 7}}>
							  	{t("Habilitar localização")}
							</Text>
						</View>
						<View style={{flex: 2, alignItems: 'flex-end'}}>
							<Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 6, 
		flexDirection: 'row',
		alignItems: 'center'
	},
	txt: {
		color: 'white',
		fontFamily: Descricao,
		fontSize: 14,
		fontWeight: '700'
	}
})

export default Configuracoes