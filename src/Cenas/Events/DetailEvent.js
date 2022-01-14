import React, { useState, useEffect } from 'react'
import { Alert, Modal, Dimensions, View, Text, ScrollView, ImageBackground, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native'
import { Background, Primary, Descricao, Titulo, CinzaEscuro } from "../../Styles"
import Icon from 'react-native-vector-icons/Ionicons';
import Share from 'react-native-share';
import LinearGradient from 'react-native-linear-gradient'
import BackButtonSolid from "../../Components/Buttons/BackButtonSolid"
import { BlurView, VibrancyView, } from "@react-native-community/blur";
import { useRoute, useNavigation } from '@react-navigation/native';
import PerfilPublico from '../Perfil/PerfilPublico' 
import { useIsFocused } from '@react-navigation/native';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { translate } from '../../Locales'
const t = translate

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;
 
import { HelpersCheckIn, HelpersEvents } from '../../Helpers'
const helpersCheckIn = new HelpersCheckIn();
const helpersEvents = new HelpersEvents();

import { connect } from 'react-redux';
import { retrive_user } from '../../Redux/actions';

const DetailEvent = (props) => {
	const [participar, setParticipar] = useState(false);
	const [meuEvento, setMeuEvento] = useState(false);
	const [checkIn, setCheckIn] = useState([]);
	const [checkInSelect, setCheckInSelect] = useState('');
	const [chekins, setChekins] = useState([]);
	const [check, setCheck] = useState()
	const [modalVisible, setModalVisible] = useState(false);
	const [token, setToken] = useState("")

	const route = useRoute();
	const navigation = useNavigation();

	const { item } = route.params;

	const isFocused = useIsFocused();

	useEffect(() => {
		helpersEvents.GetChekinByEvent(item._id).then(response => setChekins(response.data))
	}, [])

	useEffect(() => {
		if(props.user.id == item.author.id){
			setMeuEvento(true)
		}else{
			findCheckIn()
		}
	}, [])

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

	const findCheckIn = () => {
		helpersCheckIn.CheckInMe().then(resp => {
			let eventos = []
			resp.data.forEach(ids => eventos.push(ids.event.id));
			resp.data.forEach(ids => {
				if(ids.event.id === item.id){
					setCheckInSelect(ids.id);
				}
			});
			setCheckIn(eventos)
		})

	}

	const Fun = async () => {
  		await Share.open({title: 'Evento', message: 'Passeio no parque'})
	};

	const fazerCheckIn = () => {
		setCheckIn([item.id])
		helpersCheckIn.CheckIn({
			idEvent: item.id, 
			idUser:props.user.id
		}).then(resp => {
			resp ? findCheckIn() : setCheckIn([])
		})
	}

	const CancelarCheckIn = () => {
		setCheckIn([])
		helpersCheckIn.CancelCheckInMe(checkInSelect).then(resp => {
			resp ? findCheckIn() : setCheckIn([item.id])
		})
	}

	const result = item.photos.find(fruit => fruit.banner === true );

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>
		<ScrollView style={{flex:1, backgroundColor: Background}}>
			<ImageBackground
			  style={{height: 249, width: '100%', flex: 1}}
			  source={{uri: result.url}}
			>
			<View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
				<View style={{paddingLeft: 30, paddingTop: 20, flex: 1}}>
					<BackButtonSolid callback={() => navigation.goBack()}/>
				</View>
				<View style={{paddingRight: 30, paddingTop: 20, flexDirection : 'row', justifyContent: 'center'}}>
					<TouchableOpacity onPress={() => Fun()}>
						<Icon name="share-outline" size={26} color={'white'} style={{marginHorizontal: 10}}/>
					</TouchableOpacity>	
					{
						meuEvento ?
						<TouchableOpacity onPress={() => navigation.navigate('EditEvent', { item: item })}> 
							<Icon name="pencil" size={26} color={'white'} />
						</TouchableOpacity> 
						: null
					}
				</View>
			</View>
			{
				Platform.select({
					ios: <BlurView
						style={{flex: 1, margin: 30, justifyContent:'center',  borderRadius: 10}}
						blurType="light"
						blurAmount={0.1}
						reducedTransparencyFallbackColor="white"
					>
						<View style={{paddingLeft: 20}}>
							<Text style={{fontFamily: Titulo, color: 'white', fontSize: 10, fontWeight: '400'}}>
						  		{t(item.category.name)}
							</Text>
							<Text style={{fontFamily: Titulo, color: 'white', fontSize: 25, paddingVertical: 5, fontWeight: 'bold'}}>
						  		{item.title}
							</Text>
							<View style={{flexDirection: 'row', alignItems: 'center'}}>
								<Icon name="location-outline" size={13} color={'white'} />
								<Text  style={{paddingHorizontal:5, fontFamily: Titulo, color: 'white', fontSize: 10, fontWeight: '400'}}>
						  			{item.location_name}
								</Text>
							</View>
						</View>
					</BlurView>,
					android: <View	style={[styles.styleViewBlur, {flex: 1, margin: 30, justifyContent:'center'}]}>
						<View style={{paddingLeft: 20}}>
							<Text style={{fontFamily: Titulo, color: 'white', fontSize: 10, fontWeight: '400'}}>
						  		{t(item.category.name)}
							</Text>
							<Text style={{fontFamily: Titulo, color: 'white', fontSize: 25, paddingVertical: 5, fontWeight: 'bold'}}>
						  		{item.title}
							</Text>
							<View style={{flexDirection: 'row', alignItems: 'center'}}>
								<Icon name="location-outline" size={13} color={'white'} />
								<Text  style={{paddingHorizontal:5, fontFamily: Titulo, color: 'white', fontSize: 10, fontWeight: '400'}}>
						  			{item.location_name}
								</Text>
							</View>
						</View>
					</View>
				})
			}
			
			</ImageBackground>
			{
				meuEvento ? null : checkIn.includes(item.id) ? 
				<View style={{flexDirection: 'row', marginTop: 20}}>
					<TouchableOpacity style={styles.bottonCancel} onPress={() => CancelarCheckIn()}>
						<Text style={[styles.txtBotao, {color: 'red'}]}>
						  	{t("Cancelar")}
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.sendMessage} onPress={() => navigation.navigate("TalkEvent", { event: item, user_id: props.user.id, token: token })}>
						<LinearGradient colors={['#eba358', '#df1884']} style={styles.enviarMsg}>
							<Text style={styles.txtBotao}>
							  	{t("Mandar mensagem")}
							</Text>
						</LinearGradient>
					</TouchableOpacity>
				</View>
				: 
				<TouchableOpacity style={styles.botao} onPress={() => fazerCheckIn()}>
					<Text style={styles.txtBotao}>
					  	{t("Vou participar")}
					</Text>
				</TouchableOpacity>
			}
			
			<Text style={styles.txtTitulo}>
			  {t("Data e horário")}
			</Text>
			<View style={{paddingLeft: 30, paddingTop: 10}}>
				<View style={{flexDirection: 'row'}}>
					<View style={[styles.date, {width: 120}]}>
						<Icon name="calendar-outline" size={16} color={'white'} />
						<Text style={styles.txtDate}>
						   {item.date}
						</Text>
					</View>
					<View style={[styles.date, {width: 80}]}>
						<Icon name="time" size={16} color={'white'} />
						<Text style={styles.txtDate}>
						  	{item.hour}
						</Text>
					</View>
				</View>
			</View>
			<View>
				<Text style={styles.txtTitulo}>
			 		{t("Sobre o evento")}
				</Text>
				<Text style={styles.txtDescricao}>
			 		{item.about}
				</Text>
			</View>
			<View>
				<Text style={styles.txtTitulo}>
			 		{t("Local de encontro")}
				</Text>
				<Text style={styles.txtDescricao}>
			 		{item.location_name}
				</Text>

				<TouchableOpacity 
					style={styles.map} 
					onPress={() => navigation.navigate('FullMap', {
						cords:{
							lat: item.location.latitude, 
							long:  item.location.longitude
						}
					})}>
					{
						item.location ? <MapView
					      style={styles.mapRender}
					      region={{
					         latitude: item.location.latitude,
					         longitude: item.location.longitude,
					         latitudeDelta: 0.0143,
					         longitudeDelta: 0.0134,
					      }}
					      showsUserLocation
					      followsUserLocation
					      loadingEnabled
					   /> : <Icon name="location" size={150} color={Background} />
					}
				</TouchableOpacity>
			</View>
			{
				chekins.length > 0 ?
					<View>
						<View>
							<Text style={styles.txtTitulo}>
						 		{t("Vão participar")}
							</Text>
						</View>
						<View style={{paddingHorizontal: 30}}>
							{
								chekins.map((item, index) => {
									return(
										<TouchableOpacity 
											style={{ flexDirection: 'row', alignItems: 'center',  marginTop: 16}}
											onPress={() => {
												setCheck(item.user._id),
												setModalVisible(!modalVisible)
											}}
											key={index}
										>
											{
												item.user.photos.map((ft, index) => {
													return ft.profile ? 
														<Image
															style={{height: 40, width: 40, borderRadius: 5}}
															source={{uri: ft.url || ft.uri}}
															key={index}
															resizeMode='cover'
														/>
													: null
												})
											}
											<Text style={styles.txtChekin}>
											  	{item.user.name}
											</Text>
										</TouchableOpacity>
									)	
								})
							}
						</View> 
					</View>
				: null
			}
		</ScrollView>
		<Modal
        	animationType="slide"
        	transparent={true}
        	visible={modalVisible}
        	onRequestClose={() => {
          	setModalVisible(!modalVisible);
        	}}
      >
      	<PerfilPublico 
      		item={check} 
      		sendMessage={() => {
      			setModalVisible(!modalVisible); 
      			navigation.navigate("Talk", {user_id: props.user.id, send_id: check, token: token})
      		}}
      		meu_id={props.user.id} 
      		dismiss={() => setModalVisible(!modalVisible)}
      		attUser={() => props.retrive_user()}
      	/>
      </Modal>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	botao: {
		marginTop: 20, 
		height: 54, 
		marginHorizontal: 30, 
		backgroundColor: Primary, 
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	txtBotao: {
		fontSize: 14,
		fontWeight: '700',
		fontFamily: Descricao,
		color: 'white'
	},
	date: {
		height: 35,
		backgroundColor: 'rgba(255, 255, 255, 0.25)',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		marginRight: 20,
		flexDirection: 'row'
	},
	txtTitulo: {
		paddingLeft: 30,
		paddingTop: 20,
		fontSize: 12,
		fontWeight: '600',
		fontFamily: Descricao,
		color: '#B1A699'
	},
	txtDescricao: {
		paddingHorizontal: 30,
		paddingTop: 5,
		fontSize: 14,
		fontWeight: '400',
		fontFamily: Descricao,
		color: 'white'
	},
	txtDate: {
		color: 'white', 
		fontSize: 14, 
		fontWeight: '600',
		fontFamily: Descricao,
		paddingLeft: 5
	},
	map: {
  		height: Width, 
  		marginHorizontal: 30, 
  		backgroundColor: CinzaEscuro, 
  		marginTop: 20, 
  		borderRadius: 10,
  		justifyContent: 'center',
  		alignItems: 'center'
  	},
  	mapRender: {
  		height: Width,
  		width: '100%',
  		borderRadius: 10,
  	},
  	bottonCancel: {
  		flex: 1, 
  		borderWidth: 1, 
  		borderColor: 'red', 
  		height: 54, 
  		borderRadius: 20,
  		justifyContent: 'center',
  		alignItems: 'center',
  		marginLeft: 30,
  		marginRight: 5
  	},
  	sendMessage: {
  		flex: 1, 
  		height: 54, 
  		justifyContent: 'center',
  		alignItems: 'center',
  		marginLeft: 5,
  		marginRight: 30
  	},
  	enviarMsg: {
  		flex: 1, 
  		width: '100%', 
  		borderRadius: 20,
  		justifyContent: 'center',
  		alignItems: 'center'
  	},
  	styleViewBlur: {
		borderRadius: 10,
		shadowOpacity: 1,
		shadowColor: '#000',
		shadowOffset: { width: 10, height: 10 },
		shadowRadius: 5,
		elevation: 5,
		backgroundColor: "rgba(255, 255, 255, 0.3)"
	},
	txtChekin: {
		color: 'white', 
		fontFamily: Descricao,
		fontWeight: '700',
		fontSize: 12,
		paddingLeft: 12
	}
})

const mapStateToProps = (state) => {
	const { user } = state.Auth;
   return { user };
};

export default connect(mapStateToProps, { retrive_user })(DetailEvent);