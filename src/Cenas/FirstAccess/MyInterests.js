import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, FlatList, Image, SafeAreaView, ImageBackground } from 'react-native'
import { Background, Titulo, Descricao } from '../../Styles'
import { BlurView } from "@react-native-community/blur";
import GoButton from '../../Components/Buttons/GoButton'
import BackButton from '../../Components/Buttons/BackButton'
import { useNavigation } from '@react-navigation/native'
const screenWidth = Dimensions.get("window").width;
const numColumns = 2;
const tileSize = (screenWidth - 30) / numColumns;

import { translate } from '../../Locales'
const t = translate

import { connect } from 'react-redux';
import { retrive_user } from '../../Redux/actions';

import { HelpersUser, HelpersInterests } from "../../Helpers";
const helpersUser = new HelpersUser();
const helpersInterests = new HelpersInterests();

const MyInterests = (props) => {
	const [Data, setData] = useState()
	const [refresh, setRefresh] = useState(false)
	const [inter, setInter] = useState([]);

	const navigation = useNavigation() 

	useEffect(() => {
		setRefresh(!refresh)
		helpersInterests.GetInterests()
		.then(response => {
			setData(response.data),
			setRefresh(!refresh)
		})
	}, [])

	useEffect(() => {
		setInter(props.user.interests)
	}, [])

	const setInteresse = (interesse) => {
		const findDay = inter.includes(interesse) 
		if(findDay == true){
			const novo = []
			inter.forEach(day => {if(day !== interesse) novo.push(day)})
			setInter(novo)
		}else{
			setInter([...inter, interesse])
		}
	}

	const salvarInteresse = () => {
		if(inter.length > 0){
			helpersUser.ModifydUser({...props.user, interests:inter})
			.then(resp => {
				if(resp => true){
					props.retrive_user(),
					navigation.navigate('AddPhotos')
				}else{
					alert(response.message)
				}
			})
		}else{
			alert('Selecione seus interesses')
		}
	}

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>
		<View style={{flex: 1, backgroundColor: Background}}>
			<View style={{flex: 10}}>
				<Text style={styles.titulo}>
					{t("Meus Interesses")}
				</Text>
				<Text style={styles.descricao}>
					{t("Selecione todos os seus interesses")}:
				</Text>
				<FlatList
					numColumns={2}
					data={Data}
					renderItem={({item}) => 
						<TouchableOpacity style={{flex:1}} onPress={() => setInteresse(item.id)}>
							<ImageBackground 
								source={{uri: item.image}} 
								style={{ height: tileSize/2, width: tileSize, margin:10, justifyContent:'flex-end'}}
								imageStyle={{borderRadius: 10, borderWidth: inter.includes(item.id) ? 2 : null, borderColor: inter.includes(item.id) ? '#DF1884' : null}}
							>
								{
									Platform.select({
										ios: <BlurView
											style={{height:26, justifyContent:'center', paddingHorizontal: 20, borderRadius: 10}}
											blurType="light"
											blurAmount={0.1}
											reducedTransparencyFallbackColor="white"
										>
											<Text style={{fontFamily: Titulo, fontSize: 12, color:'white', fontWeight: 'bold'}}>
											  	{item.name}
											</Text>
										</BlurView>,
										android: <View	style={[styles.styleViewBlur, {height:26, justifyContent:'center', paddingHorizontal: 20}]}>
											<Text style={{fontFamily: Titulo, fontSize: 12, color:'white', fontWeight: 'bold'}}>
											  	{item.name}
											</Text>
										</View>
									})
								}
								
							</ImageBackground>
						</TouchableOpacity>
					}
					keyExtractor={item => item.image}
					extraData={refresh}
				/>
			</View>
			<View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', padding:25}}>
				<BackButton press={() => navigation.goBack()}/>
				<GoButton width={100} press={() => salvarInteresse()}/>
			</View>
		</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
  	titulo: {
		fontFamily: Titulo,
		fontSize: 38,
		color: 'white',
		padding:25
	},
	descricao:{
		fontFamily: Descricao,
		fontSize: 14,
		color: 'white',
		marginVertical: 15,
		paddingHorizontal:25
	},
	styleViewBlur: {
		borderRadius: 10,
		shadowOpacity: 1,
		shadowColor: '#000',
		shadowOffset: { width: 10, height: 10 },
		shadowRadius: 5,
		elevation: 5,
		backgroundColor: "rgba(255, 255, 255, 0.3)"
	}
});

const mapStateToProps = (state) => {
	const { user } = state.Auth;
   return { user };
};

export default connect(mapStateToProps, { retrive_user })(MyInterests);