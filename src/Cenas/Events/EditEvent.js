import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView,SafeAreaView, StyleSheet, Alert, PermissionsAndroid, TextInput as NativeTextInput, TouchableOpacity, Dimensions, ImageBackground} from 'react-native'
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import { Background, Titulo, CinzaEscuro, Descricao, Placeholder, Primary } from "../../Styles"
import { useNavigation, useRoute } from '@react-navigation/native'
import SaveCancelBar from "../../Components/SaveCancelBar";
import { TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import useDebounce from '../../Components/useDebounce';
import MapView from 'react-native-maps';
import ImagePicker from 'react-native-image-crop-picker';

import { translate } from '../../Locales'
const t = translate

const Width = Dimensions.get('window').width;
const Height = Dimensions.get('window').height;

import { connect } from 'react-redux';

import { HelpersInterests, HelpersEvents, HelpersLocation } from "../../Helpers";
const helpersInterests = new HelpersInterests();
const helpersEvents = new HelpersEvents();
const helpersLocation = new HelpersLocation();

const EditEvent = (props) => {
	const [dropdown, setDropdown] = useState(null);
	const [titulo, setTitulo] = useState('');
	const [data, setData] = useState('');
	const [horario, setHorario] = useState('')
	const [interests, setInterests] = useState()
	const [aboutEvent, setAboutEvent] = useState('');
	const [location, setLocation] = useState('');
	const [cords, setCords] = useState();
	const [predictions, setPredictions] = useState([]);
	const [photos, setPhotos] = useState([])


	const navigation = useNavigation();
	const route = useRoute();

	{/*useEffect(() => {
		helpersInterests.GetInterests()
		.then(response => {
			const inter = []
			response.data.forEach(item => {
  				inter.push({value: item.id, label: item.name})
  			})
  			setInterests(inter)
		})
	}, []) */}

	useEffect(() => {
		setTitulo(route.params.item.title)
		setData(route.params.item.date);
		setHorario(route.params.item.hour);
		setAboutEvent(route.params.item.about);
		setLocation(route.params.item.location_name);
		setCords(route.params.item.location);
	}, [])

	useEffect(() => {
		const fotosFormatadas = []
		route.params.item.photos.forEach(foto => fotosFormatadas.push({
			id: foto._id,
			banner: foto.banner,
			url: foto.url,
			situacao: "banco",
		}))
		setPhotos(fotosFormatadas);
	}, [])

	const selecionarEntrada = () => {
		Alert.alert(t('Selecione'), t('de onde virá a foto'), [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{
				text: t('Câmera'),
				onPress: () =>
					requestCameraPermission().then(resp =>
						resp ? captureImage('photo') : null,
					),
			},
			{text: t('Galeria'), onPress: () => chooseFile('photo')},
		]);
	};

	const requestCameraPermission = async () => {
		if (Platform.OS === 'android') {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.CAMERA,
					{
						title: 'Camera Permission',
						message: 'App needs camera permission',
					},
				);
				// If CAMERA Permission is granted
				return granted === PermissionsAndroid.RESULTS.GRANTED;
			} catch (err) {
				console.warn(err);
				return false;
			}
		} else return true;
	};

	const requestExternalWritePermission = async () => {
		if (Platform.OS === 'android') {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
					{
						title: 'External Storage Write Permission',
						message: 'App needs write permission',
					},
				);
				// If WRITE_EXTERNAL_STORAGE Permission is granted
				return granted === PermissionsAndroid.RESULTS.GRANTED;
			} catch (err) {
				console.warn(err);
				alert('Write permission err', err);
			}
			return false;
		} else return true;
	};

	const captureImage = async type => {
		ImagePicker.openCamera({
			width: 320,
			height: 180,
		}).then(image => {
			var img = [
				{
					sourceURL: image.path,
					mime: image.mime,
					banner: false,
					situacao: 'upload',
					id: new Date().toString()
				},
			];
			var PHOTOS = photos.concat(img);
			setPhotos(PHOTOS);
		});
	};

	const chooseFile = type => {
		ImagePicker.openPicker({
			width: 320,
  			height: 180,
			multiple: true,
		}).then(images => {
			var imgs = [];
			images.forEach(img =>
				imgs.push({
					sourceURL: img.path,
					mime: img.mime,
					banner: false,
					situacao: 'upload',
					id: new Date().toString()
				}),
			);
			var PHOTOS = photos.concat(imgs);
			setPhotos(PHOTOS);
		});
	};


	const editEvent = () => {
		helpersEvents.EditEvent({
			...route.params.item,
			title: titulo,
			date: data,
			hour: horario,
			about: aboutEvent,
			location: cords,
			location_name: location,
		}).then((resp) => { 
			if(resp == true){
				salvarFotos() 
			}else {
			 	alert(resp.message)
			}
		})
	}


	const salvarFotos = () => {
		if (photos.length > 0) {
			var itemsProcessed = 0;
			photos.forEach((item, index, array) => {
				mandarPhoto(item).then(() => {
				   itemsProcessed++;
				   if(itemsProcessed === array.length) {
				     helpersEvents.GetEventId(route.params.item.id).then(resp => 
				     	navigation.navigate('DetailEvent', { item: resp.data}))
				   }
				});
			});
		} else {
			alert(t('Selecione as suas fotos'));
		}
	};

	const mandarPhoto = async(item) => {
		switch (item.situacao) {
		  	case 'upload':
		    	await helpersEvents.SendPhotos({
					event: route.params.item.id,
					banner: item.banner,
					sourceURL: item.sourceURL,
					mime: item.mime,
				})
		   break;
		  	case 'bannerBanco':
		  		await helpersEvents.ChangePhotoEvent(route.params.item.id, item.id)
		  	default:
		    	console.log('default');
		}
	};

	const _renderItem = item => {
      return (
         <View style={styles.item}>
            <Text style={styles.textItem}>{item.label}</Text>
         </View>
      );
   };

   const debounceChange = useDebounce(handler, 1000)

   function handler(props){
   	helpersLocation.SourcePlaces(props).then(response => setPredictions(response.data.predictions))
   };

   const handleChange = ({ nativeEvent }) => {
   	const { text } = nativeEvent
   	setLocation(text)
   	debounceChange(text);
   }

   const selectPrediction = (item) => {
   	setLocation(item.description);
   	setPredictions([]);
   	helpersLocation.DetailsPlaces(item.place_id)
   	.then(response => 
   		setCords(
   			{
   				latitude: response.data.result.geometry.location.lat,
   				longitude: response.data.result.geometry.location.lng
   			}
   		)
   	)
   }

   const setarFotoBanner = (item, index) => {
		item.situacao == 'banco' ? setarFotoBannerBanco(item, index) : null;
		item.situacao == 'upload' ? setarFotoBannerUpload(item, index) : null;
		item.situacao == 'bannerBanco' ? setarFotoBannerBanco(item, index) : null;
	}


   const setarFotoBannerBanco = (item, index) => {
		const resultado = photos.map((item) => ({ ...item, banner: false}));
		resultado.splice(index, 1, {...item, banner: true, situacao: 'bannerBanco'});
		setPhotos(resultado);
	}

	const setarFotoBannerUpload = (item, index) => {
		const resultado = photos.map((item) => ({ ...item, banner: false}));
		resultado.splice(index, 1, {...item, banner: true});
		setPhotos(resultado);
	}

   var fotos = [...photos, {sourceURL: 'https://image.flaticon.com/icons/png/512/64/64579.png', enviar: true, id: 5000}]

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>
		<ScrollView style={{flex:1, backgroundColor: Background}}>
			<Text style={{color: 'white', fontFamily: Titulo, fontSize: 40, paddingTop: 30, paddingLeft: 30}}>
			  {t("Editar")}
			</Text>
			{/*
				<View style={{flex: 1, paddingHorizontal: 30}}>
					<Dropdown
		            style={styles.dropdown}
		            data={interests}
		            labelField="label"
		            valueField="value"
		            placeholder="Categoria"
		            placeholderStyle={{fontFamily: Descricao, color:'white', fontSize: 14}}
		            selectedTextStyle={{fontFamily: Descricao, color:'white', fontSize: 14}}
		            maxHeight={150}
		            value={dropdown}
		            onChange={item => {
		               setDropdown(item);
		               console.log('selected', item);
		            }}
		            renderItem={item => _renderItem(item)}
		         />
				</View>
			*/}
			<View style={{flex: 1, flexDirection: 'row',	flexWrap: 'wrap',	marginTop: 20, marginHorizontal: 23}}>
				{fotos.map((item, index) => {
					return (
						<TouchableOpacity
							style={{	width: '25%', alignItems: 'center',	paddingHorizontal: 7, paddingBottom: 15}}
							onPress={() => item.enviar ? selecionarEntrada() : setarFotoBanner(item, index)}
							key={item.id}>
							<ImageBackground
								source={{uri: item.sourceURL || item.url}}
								style={{width: '100%',	height: 67,	justifyContent: 'flex-end'}}
								resizeMode="cover"
								imageStyle={{
									borderRadius: 10,
									borderWidth: item.banner ? 2 : null,
									borderColor: item.banner ? '#DF1884' : null,
								}}>
							</ImageBackground>
						</TouchableOpacity>
					);
				})}
			</View>
			<TextInput
				mode='outlined'
				label={t("Titulo do evento")}
				placeholder={t("Digite o titulo do evento")}
				placeholderTextColor={Placeholder}
				outlineColor={titulo ? "white" : "transparent"}
				value={titulo}
				onChangeText={(value) => setTitulo(value)}
				style={styles.input}
				theme={{roundness: 10, colors: { text: 'white', primary: "white", placeholder: Placeholder } }}
			 />
			
			<View style={{flexDirection: 'row', paddingHorizontal: 30}}>
				
				<TextInput
				   mode='outlined'
				   label={t("Data")}
				   placeholder={t("Digite a data")}
				   placeholderTextColor={Placeholder}
				   outlineColor={data ? "white" : "transparent"}
				   value={data}
				   style={[styles.inputHorizontal, {paddingRight: 5}]}
				   theme={{roundness: 10, colors: { text: 'white', primary: "white", placeholder: Placeholder } }}
			   	render={props =>
				    	<TextInputMask
				    		{...props}
			          	type={'custom'}
			          	options={{mask: '99/99/9999'}}
			          	underlineColorAndroid={'transparent'}
			          	onChangeText={(value) => setData(value)}
							keyboardType="numeric"
		          	/>
				  	}
			   />
				
				<TextInput
				   mode='outlined'
				   label={t("Horário")}
				   placeholder={t("Digite o horário")}
				   placeholderTextColor={Placeholder}
				   outlineColor={horario ? "white" : "transparent"}
				   value={horario}
				   style={[styles.inputHorizontal, {paddingLeft: 5}]}
				   theme={{roundness: 10, colors: { text: 'white', primary: "white", placeholder: Placeholder } }}
			   	render={props =>
				    	<TextInputMask
				    		{...props}
			          	type={'custom'}
			          	options={{mask: '99:99'}}
			          	underlineColorAndroid={'transparent'}
			          	onChangeText={(value) => setHorario(value)}
							keyboardType="numeric"
		          	/>
				  	}
			   />
				
			</View>
			<Text style={styles.txtSubTitulo}>
				{t("Sobre o evento")}
			</Text>
			<TextInput
				mode='outlined'
				placeholder={t("Fale um pouco sobre o evento")}
				placeholderTextColor={Placeholder}
				outlineColor={aboutEvent ? "white" : "transparent"}
				value={aboutEvent}
				onChangeText={(value) => setAboutEvent(value)}
				style={styles.input1}
				multiline={true}
				theme={{roundness: 10, colors: { text: 'white', primary: "white", placeholder: Placeholder } }}
				render={(innerProps) => (
				   <NativeTextInput
				      {...innerProps}
				      style={[
				        	innerProps.style,
				        	innerProps.multiline ? {
				         	paddingTop: 8,
				         	paddingBottom: 8,
				         	height: 100,
				        	} : null
				      ]}
				   />
				)}
			/>
			<Text style={styles.txtSubTitulo}>
			  	{t("Local de encontro")}
			</Text>

			<TextInput
				mode='outlined'
				placeholder={t("Digite o endereço")}
				placeholderTextColor={Placeholder}
				outlineColor={location ? "white" : "transparent"}
				value={location}
				onChange={handleChange}
				style={styles.input}
				theme={{roundness: 10, colors: { text: 'white', primary: "white", placeholder: Placeholder } }}
			/>

			<ScrollView style={styles.scrollView}>
				{
					predictions.map((item) => {
						return(
							<TouchableOpacity style={{padding: 8}} onPress={() => selectPrediction(item)}>
								<Text style={styles.txtPlaces}>
								  	{item.description}  
								</Text>
							</TouchableOpacity>
						)
					})
				} 	
			</ScrollView>

			<View style={styles.map}>
				{
					cords ? <MapView
					   style={styles.mapRender}
					   region={{
					      latitude: cords.latitude,
					      longitude: cords.longitude,
					      latitudeDelta: 0.0143,
					      longitudeDelta: 0.0134,
					   }}
					   showsUserLocation
					   followsUserLocation
					   loadingEnabled
					/> : <Icon name="location" size={150} color={Background} />
				}
			</View>


			<View style={{marginHorizontal: 30, paddingTop: 20}}>
				<SaveCancelBar 
      			title={"Finalizar"} callback={() => editEvent()} 
      			press={() => navigation.goBack()}
      		/>
			</View>
		</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	dropdown: {
      backgroundColor: CinzaEscuro,
      marginTop: 20,
      borderRadius: 10,
      paddingHorizontal: 10,
      height: 50,
      justifyContent: 'center'
   },
   input: {
  		color: 'white', 
  		backgroundColor: CinzaEscuro,
      borderRadius: 10, 
      height: 50,
     	marginHorizontal: 30,
     	marginTop: 20,
     	justifyContent: 'center'
  	},
  	inputHorizontal: {
  		flex: 1,
  		color: 'white', 
  		backgroundColor: CinzaEscuro,
      borderRadius: 10, 
      height: 50,
     	marginTop: 20,
     	justifyContent: 'center',
  	},
  	input1: {
  		marginTop: 17,
    	marginHorizontal: 30,
    	borderRadius: 10,
    	height: 200,
    	backgroundColor: CinzaEscuro
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
  	botao: {
  		height: 56, 
  		color: Primary, 
  		flex: 1,
  		borderRadius: 10,
  		justifyContent: 'center',
  		alignItems: 'center'
  	},
  	txtButton: {
  		fontFamily: Descricao,
  		fontSize: 14,
  		fontWeight: '700'
  	},
  	item: {
      paddingVertical: 10,
      paddingHorizontal: 7,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   textItem: {
      flex: 1,
      fontSize: 16,
      fontFamily: Descricao,
      paddingHorizontal: 7,
   },
   txtSubTitulo: {
   	fontFamily: Descricao, 
   	fontSize: 12, 
   	color: '#B1A699', 
   	paddingLeft: 30, 
   	paddingTop: 20
   },
   scrollView: {
   	maxHeight: 200,
   	//width: '100%',
   	flex: 1,
   	marginHorizontal: 30,
   	backgroundColor: CinzaEscuro,
   	borderBottomLeftRadius: 10,
   	borderBottomRightRadius: 10
   },
   txtPlaces: {
   	color: 'white', 
   	fontFamily: Descricao,
   	fontSize: 16, 
   	fontWeight: '400'
   }
})

const mapStateToProps = (state) => {
	const { user } = state.Auth;
   return { user };
};

export default connect(mapStateToProps)(EditEvent);


{/*navigation.navigate('DetailEvent', { item: {
					_id: route.params.item,
					title: titulo,
					date: data,
					hour: horario,
					about: aboutEvent,
					location: cords,
					location_name: location,
					category: route.params.item.category,
					author: route.params.item.author,
					__v: 0,
					id: route.params.item.id
				}});*/}