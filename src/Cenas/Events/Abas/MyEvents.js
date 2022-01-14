import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, FlatList, ImageBackground, Image } from 'react-native'
import { Primary, Descricao, Titulo, CinzaClaro } from '../../../Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { BlurView } from "@react-native-community/blur";
import Listagem from '../../../Components/Listagem'
import GoButton from '../../../Components/Buttons/GoButton'


import { translate } from '../../../Locales'
const t = translate

const Gastronomia = [
	{uri: require('../../../Images/Events/Rectangle6.png'), id: 4},
	{uri: require('../../../Images/Events/Rectangle7.png'), id: 5},
]

const MyEvents = (props) => {
	return (
		<View>
			<TouchableOpacity style={styles.botao} onPress={() => props.press()}>
				<Text style={{color: Primary, fontSize: 14, fontFamily: Descricao, fontWeight: '700'}}>
					Criar evento  
				</Text>
			</TouchableOpacity>

			<Listagem 
				item={{name: 'Meus eventos', id: props.user.id}} 
				tipoEvento={'Meus_Eventos'}
				select={(evento) => props.evento(evento)}
			/>

			<Listagem 
				item={{name: 'Vou participar', id: props.user.id}} 
				tipoEvento={'chekin-me'}
				select={(evento) => props.evento(evento)}
			/>

		  	<View style={{marginHorizontal: 30}}>
		  		<Text style={[styles.titulos, {paddingBottom: 20}]}>
		  			{t("Hangouts")}
		  		</Text>
		  		<View style={{height: 114, backgroundColor: CinzaClaro, borderRadius: 20}}>
		  			<View style={{marginTop: -20, alignItems: 'center'}}>
		  				<Image
			  			  style={{width: 44, height: 44}}
			  			  source={require('../../../Images/Events/Rectangle33.png')}
			  			/>
		  			</View>
			  		<View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingHorizontal: 15}}>
			  			<View style={{flex: 3}}>
			  				<Text style={{fontFamily: Descricao, color: 'white'}}>
			  				  {t("Pessoas próximas a você estão disponíveis para Hangout")}!
			  				</Text>
			  			</View>
			  			<View style={{flex: 1}}>
			  				<GoButton />
			  			</View>
		  			</View>
		  		</View>
		  	</View>
		  	<View style={{height: 120}} />
		</View>
	)
}

const styles = StyleSheet.create({
	botao: {
		borderColor: Primary, 
		borderWidth: 2, 
		borderRadius: 20, 
		height: 56,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 30
	},
	events: {
		marginLeft: 30,
	},
	titulos: {
		fontFamily: Titulo, 
		fontSize:20, 
		color: Primary, 
		marginVertical: 10
	}
})

export default MyEvents