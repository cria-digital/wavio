import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native'
import { Background, CinzaClaro, Descricao } from '../../Styles'
import LinearGradient from 'react-native-linear-gradient';
import BackButtonSolid from '../../Components/Buttons/BackButtonSolid'
import { useRoute, useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';
import { retrive_user } from '../../Redux/actions';

//abas
import MeusSeguidores from './Abas/MeusSeguidores'
import Seguindo from './Abas/Seguindo'
import Referencias from './Abas/Referencias'

import { HelpersFollowers } from "../../Helpers";
const helpersFollowers = new HelpersFollowers();

const Seguidores = (props) => {
	const [tab, setTab] = useState();
	const [seguidores, setSeguidores] = useState([]);
	const [seguindo, setSeguindo] = useState([])

	const route = useRoute();
	const navigation = useNavigation();

	const { aba, id } = route.params;

	useEffect(() => {
		onToggleTab(aba)
	}, [])

	useEffect(() => {
		switch (tab) {
         case "Referências":
            //getReferences()
         break;
				
			case "Seguidores":
				buscarSeguidores()
			break;

			case "Seguindo":
				buscarSeguindo()
			break;
		}	
	}, [tab])

	const buscarSeguidores = () => {
		helpersFollowers.GetFollowers(id).then(response => setSeguidores(response.data))
	}

	const buscarSeguindo = () => {
		helpersFollowers.GetFollowing(id).then(response => setSeguindo(response.data));
	}

   
   const onToggleTab = (aba) => {
   	setTab(aba)
   } 

   const deixarSeguir = (idSeguidor) => {
		helpersFollowers.Unfollow(idSeguidor)
		.then(response => {
			response ? (
				buscarSeguindo(),
				props.retrive_user()
			) : alert('Ocorreu um erro')
		})
	}

	const removerSeguidor = (idSeguidor) => {
		helpersFollowers.Unfollow(idSeguidor)
		.then(response => {
			response ? (
				buscarSeguidores(),
				props.retrive_user()
			) : alert('Ocorreu um erro')
		})
	}

   const renderAba = () => {
   	if(tab == 'Seguidores'){
   		return(
   			<MeusSeguidores data={seguidores} press={(value) => removerSeguidor(value)}/>
   		)
   	}else if(tab == 'Seguindo'){
   		return(
   			<Seguindo data={seguindo} press={(value) => deixarSeguir(value)}/>
   		)
   	}else if(tab == 'Referências'){
   		return(
   			<Referencias data={data} />
   		)
   	}
   }

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>	
			<View style={{paddingLeft: 30, paddingTop: 30, paddingBottom: 20}}>
				<BackButtonSolid callback={(value) => navigation.goBack()}/>
			</View>
			
			<View style={{flexDirection: 'row', marginHorizontal: 30, paddingTop: 20}}>
				{/*<TouchableOpacity style={{ flex: 1}} onPress={() => onToggleTab('Referências')}>
					<Text style={styles.txtEvents}>
					   Referências 
					</Text>
					{
						tab == 'Referências' ? <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#eba358', '#df1884']} style={{flex: 1, height: 2}} /> 
						: <View style={{borderColor: CinzaClaro, borderWidth: 1, flex: 1}} />
					}
				</TouchableOpacity>*/}

				<TouchableOpacity style={{ flex: 1}} onPress={() => onToggleTab('Seguidores')}>
					<Text style={styles.txtEvents}>
						Seguidores
					</Text>
					{
						tab == 'Seguidores' ? <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#eba358', '#df1884']} style={{flex: 1}} /> 
						: <View style={{borderColor: CinzaClaro, borderWidth: 1, flex: 1}} />
					}
					
				</TouchableOpacity>
					
				<TouchableOpacity style={{ flex: 1}} onPress={() => onToggleTab('Seguindo')}>
					<Text style={styles.txtEvents}>
					   Seguindo
					</Text>
					{
						tab == 'Seguindo' ? <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#eba358', '#df1884']} style={{flex: 1, height: 2}} /> 
						: <View style={{borderColor: CinzaClaro, borderWidth: 1, flex: 1}} />
					}
				</TouchableOpacity>
			</View>
			{renderAba()}
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

export default connect(mapStateToProps, { retrive_user })(Seguidores);
