import React, { useState, useEffect } from 'react'
import {Button, View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import { Searchbar, Menu } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { CinzaEscuro, Placeholder, Primary, Descricao, Titulo } from '../../../Styles'
import Listagem from '../../../Components/Listagem'
import Calendario from '../../../Components/Calendar'

import { translate } from '../../../Locales'
const t = translate

import { HelpersInterests } from "../../../Helpers";
const helpersInterests = new HelpersInterests();

const AllEvents = (props) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [parques, setParques] = useState([])
	const [gastronomia, setGastronomia] = useState([])
	const [cinema, setCinema] = useState([])
	const [interesses, setInteresses] = useState([]);
	const [data, setData] = useState([]);
	const [visible, setVisible] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const [inter, setInter] = useState([]);
	const [horarios, sethorarios] = useState([
		'Qualquer horário', 'Manhã', 'Tarde', 'Noite'
	])
	const [hora, setHora] = useState([])

	useEffect(() => {
		helpersInterests.GetInterests()
		.then(response => { setData(response.data) })
	}, [])

  	const onChangeSearch = query => setSearchQuery(query);

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

	return (
		<View style={{flex: 1}}>
			<View style={{marginVertical: 30}}>
				<Calendario />
			</View>
			<View style={{flexDirection: 'row', alignItems: 'center'}}>	
				<View style={{flex:4}}>
					<Searchbar
				      placeholder={t("Pesquisar")}
				      onChangeText={onChangeSearch}
				      value={searchQuery}
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
												  {item.name}
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
				data.map((item) => {
					return(
						<Listagem item={item} tipoEvento={'listagem'} select={(evento) => props.evento(evento)} key={item.id} />
					)
				})
			}
			<View style={{height: 120}} />
		</View>
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
		fontFamily: Descricao, 
		fontSize:20, 
		color: Primary, 
		marginVertical: 10,
		fontWeight: 'bold'
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

export default AllEvents