import React, { useEffect, useState } from 'react'
import { Platform, ScrollView, SafeAreaView, View, Text, StyleSheet, Image, Placeholder, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import { Background, Descricao, Titulo, CinzaEscuro, Primary, CinzaClaro } from '../../Styles'
import Icon from 'react-native-vector-icons/Ionicons';
import { Searchbar, Menu, Button, Divider, Chip } from 'react-native-paper';
import TabNavigator from '../../Components/TabNavigator'
import GoButton from '../../Components/Buttons/GoButton'
import Header from '../../Components/Header'
import Listagem from '../../Components/Listagem'
import ListSearch from '../../Components/Listagem/ListSearch'
import { BlurView, VibrancyView, } from "@react-native-community/blur";
import { useNavigation } from '@react-navigation/native';
import Calendario from '../../Components/Calendar'

import { translate } from '../../Locales'
const t = translate

import { connect } from 'react-redux';
import { toggle_tab, requestEvents, retrive_token } from '../../Redux/actions';

import { AuthContext } from '../../../components/context'; 

import { HelpersInterests, HelpersEvents } from "../../Helpers";
const helpersInterests = new HelpersInterests();
const helpersEvents = new HelpersEvents();


const index = (props) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [data, setData] = useState([]);
	const [visible, setVisible] = useState(false);
	const [inter, setInter] = useState([]);
	const [horarios, sethorarios] = useState([
		t('Qualquer horário'), t('Manhã'), t('Tarde'), t('Noite')
	])
	const [hora, setHora] = useState([]);
	const [searchArr, setSearchArr] = useState([])

	useEffect(() => {
		props.requestEvents();
		props.retrive_token()
	}, [])

	useEffect(() => {
		helpersInterests.GetInterests()
		.then(response => {	setData(response.data)})
	}, [])

	const { signOut } = React.useContext(AuthContext);

	const navigation = useNavigation();

	const openMenu = () => setVisible(true);

	const closeMenu = () => setVisible(false);

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

	const setHorario = (horario) => {
		const findHorario = hora.includes(horario) 
		if(findHorario == true){
			const novo = []
			hora.forEach(day => {if(day !== horario) novo.push(day)})
			setHora(novo)
		}else{
			setHora([...hora, horario])
		}
	}

	function handleChange(query){
		setSearchQuery(query)
	  	var search = query
	  	let conversation = props.events;
	  	let filteredArray = [];
	        
	     
	   for (let i = 0; i < conversation.length; i++) {
	      if(conversation[i].title.toLowerCase().includes(search) || conversation[i].title.toUpperCase().includes(search))
	         filteredArray.push(conversation[i]);
	   }

	  setSearchArr(filteredArray)
	}

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>
		<ScrollView style={{flex:1, backgroundColor: Background}}>
			<Header user={props.user} press={() => props.toggle_tab('Profile')} pressIcon={() => props.toggle_tab('Notificações')}/>
			<View style={{flexDirection: 'row', alignItems: 'center'}}> 
				<View style={{flex:4}}>
					<Searchbar
						placeholder="Pesquisar"
						onChangeText={(value) => handleChange(value)}
						value={searchQuery}
						autoCapitalize='none'
						style={{marginLeft: 30, backgroundColor: CinzaEscuro, height: 45}}
						theme={{roundness: 10, colors: { text: 'white', primary: "white", placeholder: Placeholder } }}
					/>
				</View>
				<View style={{paddingLeft: 10, paddingRight: 30}}>
					<Menu
						visible={visible}
						onDismiss={closeMenu}
						contentStyle={{backgroundColor: '#2D2D2D' }}
						anchor={
							<TouchableOpacity onPress={openMenu}>
								<Icon name="options" size={23} color={Primary} />
							</TouchableOpacity>}
						>
						<View style={{height: 400, width: 300}}>
							<View style={styles.menu}>
								<Text style={{color: 'white', fontFamily: Titulo, fontSize: 14}}>
									{t("Filtros")}
								</Text>
								<Icon name="options" size={23} color={Primary} onPress={closeMenu} />
							</View>
							<Text style={styles.menuLabel}>
							  {t("Tipos de eventos")}
							</Text>
							<View style={{flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10,  flexWrap: 'wrap'}}>
								{
									data.map((item, index) => { 
										return (
											<TouchableOpacity 
												style={[styles.itemMenu, {
													backgroundColor: inter.includes(item.id) ? Primary : null,
													borderColor: inter.includes(item.id) ? null : 'white', 
													borderWidth: inter.includes(item.id) ? null : 1, 
												}]} 
												key={item.id}
												onPress={() => setInteresse(item.id)}>
												{
													inter.includes(item.id) ? 
														<Icon name="checkbox" size={18} color={'white'} style={{paddingRight: 7}}/> 
													: null
												}
												<Text style={styles.txtItem}>
												  {t(item.name)}
												</Text>
											</TouchableOpacity>
										)
									})
								}
							</View>
							<Text style={styles.menuLabel}>
							  {t("Tipos de eventos")}
							</Text>
							<View style={{flexDirection: 'row', paddingHorizontal: 10, paddingTop: 10,  flexWrap: 'wrap'}}>
								{
									horarios.map((item, index) => {
										return (
											<TouchableOpacity 
												style={[styles.itemMenu, {
													backgroundColor: hora.includes(item) ? Primary : null,
													borderColor: hora.includes(item) ? null : 'white', 
													borderWidth: hora.includes(item) ? null : 1, 
												}]} 
												key={index.toString()}
												onPress={() => setHorario(item)}>
												{
													hora.includes(item) ? 
														<Icon name="checkbox" size={18} color={'white'} style={{paddingRight: 7}}/> 
													: null
												}
												<Text style={styles.txtItem}>
												  {item}
												</Text>
											</TouchableOpacity>
										)
									})
								}
							</View>
						</View>
					</Menu>
				</View>
			</View>
			{	
				searchQuery.length == 0 ?
				<View>
					<View style={{marginTop: 30, flexDirection: 'row'}}>
						<View style={{height: 56, width: 20, backgroundColor: '#3F3F3F', marginTop: 1}} />
						<Calendario />
					</View>
					
					<Listagem 
						item={{name: 'Eventos Recomendados', id: props.user.id}} 
						tipoEvento={'recomendados'}
						select={(evento) => navigation.navigate('DetailEvent', {item: evento})}
					/>
					

					<Listagem 
						item={{name: 'Meus eventos', id: props.user.id}} 
						tipoEvento={'Meus_Eventos'}
						select={(evento) => navigation.navigate('DetailEvent', {item: evento})}
					/>
				</View>
				: searchArr.length > 0 ? <ListSearch data={searchArr} item={{name: 'Resultados'}}/> : <Text style={{textAlign: 'center', color: 'white', fontWeight: 'bold', fontFamily: Titulo, fontSize: 14, paddingTop: 10}}>
				  Não foram encontrados nenhum resultado 
				</Text>
			}

			<View style={{marginHorizontal: 30}}>
				<Text style={[styles.titulos, {paddingBottom: 20}]}>
					{t("Hangouts")}
				</Text>
				<View style={{height: 114, backgroundColor: CinzaClaro, borderRadius: 20}}>
					<View style={{marginTop: -20, alignItems: 'center'}}>
						<Image
						  style={{width: 44, height: 44}}
						  source={require('../../Images/Events/Rectangle33.png')}
						/>
					</View>
					<View style={{flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingHorizontal: 15}}>
						<View style={{flex: 3}}>
							<Text style={{fontFamily: Descricao, color: 'white'}}>
							  {t("Pessoas próximas a você estão disponíveis para Hangout")}
							</Text>
						</View>
						<View style={{flex: 1}}>
							<GoButton press={() => props.toggle_tab('Hangouts')}/>
						</View>
					</View>
				</View>
			</View>
			<View style={{height: 120}}>
			</View>
		</ScrollView>  
		<TabNavigator focused={'Home'} callback={(value) => props.toggle_tab(value)}/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	header: {
		flex:1,
		flexDirection: 'row',
		margin: 30 
	},
	txtWelcome: {
		fontFamily: Descricao,
		color: 'white',
		fontSize: 10
	},
	txtUser: {
		fontFamily: Titulo,
		fontSize: 14,
		color: 'white'
	},
	events: {
		marginLeft: 30,
	},
	titulos: {
		fontFamily: Titulo, 
		fontSize:20, 
		color: Primary, 
		marginVertical: 10
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
	menu: {
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		alignItems: 'center', 
		paddingHorizontal: 15
	},
	menuLabel: {
		fontFamily: Descricao,
		fontWeight: '700',
		fontSize: 12,
		color: '#B1A699',
		paddingLeft: 15,
		paddingTop: 10
	}, 
	itemMenu: {
		padding: 10, 
		borderRadius: 20, 
		margin: 10,
		flexDirection: 'row',
		alignItems: 'center'
	},
	txtItem: {
		color: 'white',
		fontWeight: '600',
		fontSize: 12,
		fontFamily: Descricao
	}
})

const mapStateToProps = (state) => {
	const { user } = state.Auth;
	const { active_tab } = state.Tabs;
	const { events } = state.Events;
	return { active_tab, user, events };
};

export default connect(mapStateToProps, { toggle_tab, requestEvents, retrive_token })(index);


