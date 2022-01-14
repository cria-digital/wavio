import React, {useState, useEffect} from 'react'
import { Platform, View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { CinzaEscuro, Placeholder, Primary, Descricao, Titulo } from '../../Styles'
import { BlurView, VibrancyView } from "@react-native-community/blur";
import { useIsFocused } from "@react-navigation/native";

import { translate } from '../../Locales'
const t = translate

import { HelpersEvents, HelpersInterests } from "../../Helpers";
const helpersEvents = new HelpersEvents();

const index = (props) => {
	const [data, setData] = useState([]);

	const isFocused = useIsFocused();

	useEffect(() => {
		switch (props.tipoEvento) {
         case "Meus_Eventos":
            buscarMinhasAulas()
         break;
			
			case "listagem":
				buscarlista()
			break;

			case "chekin-me":
				buscarEventsChekin()
			break;
			case "recomendados":
				buscarEventsRecomendados()
			break;
		}	
	}, [isFocused])

	const buscarlista = async () => {
		
		let eventos = await helpersEvents.GetEvent(props.item.id)

		let mzvs = eventos.data

		setData(mzvs.reverse())
	}

	const buscarMinhasAulas = async () => {
		
		let eventos = await helpersEvents.GetMyEvents(props.item.id)

		let mzvs = eventos.data

		setData(mzvs.reverse())
	}

	const buscarEventsChekin = async () => {
		
		let eventos = await helpersEvents.GetMyEventsChekin()

		let evt = []

		eventos.data.forEach(ids => evt.push(ids.event))

		setData(evt.reverse())
	}

	const buscarEventsRecomendados = async () => {
		
		let eventos = await helpersEvents.GetEvents()

		const result = eventos.data.filter(fruit => fruit.author._id !== props.item.id );

		console.log(result)

		setData(result.reverse())
	}

	const renderItem = ({ item }) => {

		const result = item.photos.find(fruit => fruit.banner === true );

    	return (
    		<TouchableOpacity onPress={() => props.select(item)}>
		      <ImageBackground 
			      source={{uri: result.url}} 
		         resizeMode="cover"
		         style={{width: 256, height: 303, marginRight: 10, marginTop: 10, marginBottom: 10}}
		         imageStyle={{borderRadius: 10}}
		      >
			      <View style={{flex: 1}}>
			      	{
			      		Platform.select({
			      			ios: <BlurView
									style={{margin: 20, width: 90, height:40, justifyContent:'center', alignItems: 'center', borderRadius: 10}}
									blurType="light"
									blurAmount={0.1}
									reducedTransparencyFallbackColor="white"
								>
									<View style={{flexDirection: 'row'}}>
										<Icon name="calendar-outline" size={20} color={'white'} />
										<Text  style={{fontFamily: Titulo, color: 'white', fontSize: 16, fontWeight: '600', marginHorizontal: 5}}>
							  				{item.hour}
										</Text>
									</View>
								</BlurView>,
			      			android: <View	style={[styles.styleViewBlur, {height: 36, width: 84, margin: 20 }]}>
			      				<View style={{flexDirection: 'row', justifyContent: 'space-evenly', flex:1, alignItems: 'center'}}>
										<Icon name="calendar-outline" size={20} color={'white'} />
										<Text  style={{fontFamily: Titulo, color: 'white', fontSize: 14, fontWeight: '600'}}>
							  				{item.hour}
										</Text>
									</View>
			      			</View>
			      		})
			      	}
			      </View>
			      <View style={{flex: 1, justifyContent: 'flex-end'}}>
			      	{
			      		Platform.select({
			      			ios: <BlurView
									style={{ height: 100, borderRadius: 10, marginBottom:5, }}
									blurType="light"
									blurAmount={0.1}
									reducedTransparencyFallbackColor="white"
								>
									<View style={{flex: 1, justifyContent: 'center', padding: 30}}>
										<Text style={{fontFamily: Titulo, color: 'white', fontSize: 10}}>
							  				{t(item.category.name)}
										</Text>
										<Text style={{fontFamily: Titulo, color: 'white', fontSize: 22, paddingVertical: 5}} numberOfLines={1}>
							  				{item.title}
										</Text>
										<View style={{flexDirection: 'row', alignItems: 'center'}}>
											<Icon name="location" size={13} color={'white'} />
											<Text  style={{paddingLeft:5, fontFamily: Titulo, color: 'white', fontSize: 10}}>
							  					{item.location_name}
											</Text>
										</View>
									</View>
								</BlurView>,
			      			android: <View	style={[styles.styleViewBlur, {height: 100, justifyContent:'center'}]}>
			      				<View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 30}}>
										<Text style={{fontFamily: Titulo, color: 'white', fontSize: 10}}>
							  				{t(item.category.name)}
										</Text>
										<Text style={{fontFamily: Titulo, color: 'white', fontSize: 22, paddingVertical: 5}} numberOfLines={1}>
							  				{item.title}
										</Text>
										<View style={{flexDirection: 'row', alignItems: 'center'}}>
											<Icon name="location" size={13} color={'white'} />
											<Text  style={{paddingLeft:5, fontFamily: Titulo, color: 'white', fontSize: 10}}>
							  					{item.location_name}
											</Text>
										</View>
									</View>
			      			</View>
			      		})
			      	}
			      </View>
		      </ImageBackground>
		   </TouchableOpacity>   
    	);
  	};



	return(
		<View style={styles.events}>
			{
				data.length > 0 ? <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginRight: 30 }}>
					<Text style={styles.titulos}>
						{t(props.item.name)}
					</Text>
					<Icon name="arrow-forward-outline" size={23} color={Primary} />
				</View> : null
			}
			<FlatList
				data={data}
				renderItem={renderItem}
				horizontal={true}
				keyExtractor={(item, index) => index.toString()}
			/> 
		</View>
	)
}

const styles = StyleSheet.create({
	events: {
		marginLeft: 30,
	},
	titulos: {
		fontFamily: Titulo, 
		fontSize:20, 
		color: Primary, 
		marginVertical: 10,
	
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
})

export default index