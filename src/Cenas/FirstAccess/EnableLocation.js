import React, { useEffect } from 'react'
import { Linking, View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView, Image, Platform } from 'react-native'
import { Background, Titulo, Descricao } from '../../Styles'
import GoButton from '../../Components/Buttons/GoButton'
import BackButton from '../../Components/Buttons/BackButton'
import Icon from 'react-native-vector-icons/Ionicons';
import { Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'
import Geolocation from '@react-native-community/geolocation';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';

import { translate } from '../../Locales'
const t = translate

import { connect } from 'react-redux';
import { retrive_user } from '../../Redux/actions';

const EnableLocation = (props) => {
	const [isSwitchOn, setIsSwitchOn] = React.useState(false);

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


	const navigation = useNavigation()

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>
			<View style={{flex: 1, backgroundColor: Background, padding:25}}>
				<View style={{flex: 1}}>
					<Text style={styles.titulo}>
						{t("Habilitar localizaçao")}
					</Text>
					<Text style={styles.descricao}>
						{t("Para uma experiência ainda mais completa, habilite sua localização")}:
					</Text>
					<View style={{flexDirection:'row', alignItems: 'center',}}>
						<View style={{flexDirection: 'row', alignItems: 'center', flex: 3}}>
							<Icon name="location-outline" size={20} color="white" />
							<Text style={{fontFamily: Descricao, fontSize: 14, color: 'white'}}>
							  {t("Habilitar localizaçao")}
							</Text>
						</View>
						<View style={{alignItems: 'flex-end', flex: 1}}>
							<Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
						</View>
					</View>
				</View>
				<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
					<BackButton press={() => navigation.goBack()}/>
					<GoButton width={100} press={() =>  props.retrive_user()}/>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
  	titulo: {
		fontFamily: Titulo,
		fontSize: 38,
		color: 'white' 
	},
	descricao:{
		fontFamily: Descricao,
		fontSize: 14,
		color: 'white',
		marginVertical: 15
	},
});

const mapStateToProps = (state) => {
	const { user } = state.Auth;
   return { user };
};

export default connect(mapStateToProps, { retrive_user })(EnableLocation);
