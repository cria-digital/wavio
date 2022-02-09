import React, {useState, useEffect} from 'react';
import {
	Alert,
	Bottom,
	ImageBackground,
	TextInput as NativeTextInput,
	View,
	Text,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	SafeAreaView,
	Image,
	PermissionsAndroid,
	ActivityIndicator
} from 'react-native';
import {
	Background,
	Titulo,
	Primary,
	CinzaEscuro,
	Descricao,
	Placeholder,
} from '../../Styles';
import Carousel from 'react-native-snap-carousel';
import {TextInputMask} from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/Ionicons';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {TextInput} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import SaveCancelBar from '../../Components/SaveCancelBar';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

import {translate} from '../../Locales';
const t = translate;

import {HelpersUser, HelpersInterests} from '../../Helpers';
const helpersUser = new HelpersUser();
const helpersInterests = new HelpersInterests();

import {connect} from 'react-redux';
import {retrive_user} from '../../Redux/actions';

const generos = [
	{label: 'Masculino', value: 'Masculino'},
	{label: 'Feminino', value: 'Faminino'},
	{label: 'Outro', value: 'Outro'},
];

const EditPerfil = props => {
	const [photos, setPhotos] = useState();
	const [activeIndex, setActiveIndex] = useState(0);
	const [checkboxState, setCheckboxState] = useState(
		props.user.genre == null ? true : false,
	);
	const [Nome, setNome] = useState(props.user.name);
	const [Email, setEmail] = useState(props.user.email);
	const [Nascimento, setNascimento] = useState(props.user.birthdate);
	const [dropdown, setDropdown] = useState(props.user.genre);
	const [biografia, setBiografia] = useState(props.user.biography);
	const [data, setData] = useState([]);
	const [inter, setInter] = useState(props.user.interests);
	const [loading, setLoading] = useState(false)

	const navigation = useNavigation();

	useEffect(() => {
		helpersInterests.GetInterests().then(response => {
			setData(response.data);
		});
	}, []);

	useEffect(() => {
		const fotosFormatadas = []
		props.user.photos.forEach(foto => fotosFormatadas.push({
			id: foto._id,
			profile: foto.profile,
			url: foto.url,
			situacao: "banco"
		}))
		setPhotos(fotosFormatadas);
		props.user.photos[0]?.profile	? setCheckboxState(true) : setCheckboxState(false);
	}, []);

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
					profile: false,
					situacao: "upload"
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
					profile: false,
					situacao: "upload"
				}),
			);
			var PHOTOS = photos.concat(imgs);
			setPhotos(PHOTOS);
		});
	};

	const salvarFotos = () => {
		setLoading(true)
		if (photos.length > 0) {
			var itemsProcessed = 0;
			photos.forEach((item, index, array) => {
				mandarPhoto(item).then(() => {
				   itemsProcessed++;
				   if(itemsProcessed === array.length) {
				     	mudarUser();
				   }
				});
			});
		} else {
			alert(t('Selecione as suas fotos'))
			setLoading(false)
		}
	};

	const mudarUser = () => {
		helpersUser.ModifydUser({
			...props.user,
			name: Nome,
			email: Email,
			birthdate: Nascimento,
			genre: dropdown,
			biography: biografia,
			interests: inter,
		}).then(resp => {
			if (resp => true) {
				props.retrive_user();
				navigation.goBack();
				alert('Salvo com sucesso');
			} else {
				alert(response.message)
				setLoading(false)
			}
		});
	};

	const mandarPhoto = async(item) => {
		switch (item.situacao) {
		  	case 'upload':
		    	await helpersUser.SendPhotos({
					user: props.user.id,
					profile: item.profile,
					sourceURL: item.sourceURL,
					mime: item.mime,
				})
		   break;
		  	case 'fotoBanco':
		  		await helpersUser.ChangePhotoProfile(item.id)
		   break;
		  	default:
		    	console.log('default');
		}
	};

	const procurarFoto = index => {
		photos[index].profile ? setCheckboxState(true) : setCheckboxState(false);
	};

	const fotoDePerfil = () => {
		photos[activeIndex].situacao == 'banco' ? mudarFotoBanco() : null;
		photos[activeIndex].situacao == 'upload' ? mandarFotoUpload() : null;
		photos[activeIndex].situacao == 'fotoBanco' ? mudarFotoBanco() : null;
	}

	const mudarFotoBanco = () => {
		const resultado = photos.map((item) => ({ ...item, profile: false }));
		resultado.splice(activeIndex, 1, {...photos[activeIndex], profile: true, situacao: 'fotoBanco'});
		setPhotos(resultado);
		setCheckboxState(true);
	}

	const mandarFotoUpload = () => {
		const resultado = photos.map((item) => ({ ...item, profile: false }));
		resultado.splice(activeIndex, 1, {...photos[activeIndex], profile: true});
		setPhotos(resultado);
		setCheckboxState(true);
	}

	const deletar = (item, index) => {
		item.profile ? alert('Voce não pode excluir sua foto de perfil, por favor escolha outra antes!')
		: agoraDeleta(item, index);
	};

	const agoraDeleta = (item, index) => {
		var filtered = photos.filter(value => value !== item);
		item.situacao == 'banco' ? helpersUser.DeletePhoto(item.id).then(e => e ? setPhotos(filtered) : null) : null
		item.situacao == 'fotoBanco' ? helpersUser.DeletePhoto(item._id).then(e => e ? setPhotos(filtered) : null) : null
		item.situacao == 'upload' ?  setPhotos(filtered) : null

	};

	const _renderDropdown = item => {
		return (
			<View style={styles.item}>
				<Text style={styles.textItem}>{t(item.label)}</Text>
			</View>
		);
	};

	const mudarGenero = () => {
		setCheckboxState(!checkboxState);
		setDropdown(null);
	};

	const setInteresse = interesse => {
		const findDay = inter.includes(interesse);
		if (findDay == true) {
			const novo = [];
			inter.forEach(day => {
				if (day !== interesse) novo.push(day);
			});
			setInter(novo);
		} else {
			setInter([...inter, interesse]);
		}
	};

	const _renderItem = ({item, index}) => {
		return (
			<ImageBackground
				style={{
					borderRadius: 5,
					height: 250,
					padding: 8,
					marginLeft: 25,
					marginRight: 25,
					alignItems: 'flex-end',
				}}
				imageStyle={{borderRadius: 10}}
				source={{uri: item.url || item.sourceURL}}
				resizeMode="cover">
				<TouchableOpacity onPress={() => deletar(item, index)}>
					<Icon name="close-circle" size={35} color={'#FF5757'} />
				</TouchableOpacity>
			</ImageBackground>
		);
	};

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>
			<ScrollView style={{flex: 1, backgroundColor: Background}}>
				<Text
					style={{
						color: 'white',
						fontFamily: Titulo,
						fontSize: 28,
						padding: 30,
					}}>
					{t('Editar')}
				</Text>
				<View
					style={{
						flex: 1,
						backgroundColor: Background,
						paddingHorizontal: 25,
						alignItems: 'center',
					}}>
					<View style={{height: 270}}>
						<Carousel
							layout={'stack'}
							layoutCardOffset={18}
							data={photos}
							sliderWidth={300}
							itemWidth={300}
							renderItem={_renderItem}
							useScrollView={true}
							//containerCustomStyle={{ flex: 1 }}
							//slideStyle={{ flex: 1}}
							onSnapToItem={index => {procurarFoto(index), setActiveIndex(index)}}
						/>
					</View>
					<View style={{flexDirection: 'row', alignItems: 'center'}}>
						<BouncyCheckbox
							size={22}
							fillColor={Primary}
							isChecked={checkboxState}
							disableBuiltInState={true}
							unfillColor={Background}
							iconStyle={{borderColor: Primary}}
							onPress={() => fotoDePerfil()}
						/>
						<Text style={styles.fto}>{t('Usar como foto de perfil')}</Text>
					</View>
					<View style={{alignItems: 'center'}}>
						<TouchableOpacity
							style={[styles.addPhotos, {height: 90}]}
							onPress={() => selecionarEntrada()}>
							<Icon name="add-outline" size={80} color={'#848484'} />
						</TouchableOpacity>
					</View>
				</View>

				<View style={{marginHorizontal: 30, marginTop: 20}}>
					<Text style={styles.txtTitulo}>{t('Dados Pessoais')}</Text>
					<TextInput
						mode="outlined"
						label={t('Nome')}
						placeholder={t('Digite seu Nome')}
						placeholderTextColor={Placeholder}
						outlineColor={Nome ? 'white' : 'transparent'}
						value={Nome}
						onChangeText={value => setNome(value)}
						style={styles.input}
						theme={{
							roundness: 10,
							colors: {
								text: 'white',
								primary: 'white',
								placeholder: Placeholder,
							},
						}}
					/>
					<TextInput
						mode="outlined"
						label={t('E-mail')}
						placeholder={t('Digite seu e-mail')}
						placeholderTextColor={Placeholder}
						outlineColor={Email ? 'white' : 'transparent'}
						value={Email}
						onChangeText={value => setEmail(value)}
						style={styles.input}
						theme={{
							roundness: 10,
							colors: {
								text: 'white',
								primary: 'white',
								placeholder: Placeholder,
							},
						}}
					/>
					<TextInput
						mode="outlined"
						label={t('Nascimento')}
						value={Nascimento}
						placeholder={t('Digite sua data de nascimento')}
						placeholderTextColor={Placeholder}
						outlineColor={Nascimento ? 'white' : 'transparent'}
						style={styles.input}
						theme={{
							roundness: 10,
							colors: {
								text: 'white',
								primary: 'white',
								placeholder: Placeholder,
							},
						}}
						render={props => (
							<TextInputMask
								{...props}
								type={'custom'}
								options={{mask: '99/99/9999'}}
								underlineColorAndroid={'transparent'}
								onChangeText={value => setNascimento(value)}
								keyboardType="numeric"
							/>
						)}
					/>
				</View>
				<View style={{paddingHorizontal: 30}}>
					<Dropdown
						style={styles.dropdown}
						data={generos}
						labelField="label"
						valueField="value"
						placeholder={t('Gênero que se identifica')}
						placeholderStyle={{
							fontFamily: Descricao,
							color: 'white',
							fontSize: 14,
						}}
						selectedTextStyle={{
							fontFamily: Descricao,
							color: 'white',
							fontSize: 14,
						}}
						maxHeight={120}
						value={dropdown}
						onChange={item => {
							setDropdown(item.value), setCheckboxState(false);
						}}
						renderItem={item => _renderDropdown(item)}
					/>
				</View>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginHorizontal: 30,
						marginTop: 20,
					}}>
					<BouncyCheckbox
						size={22}
						fillColor={Primary}
						isChecked={checkboxState}
						disableBuiltInState={true}
						unfillColor={Background}
						iconStyle={{borderColor: Primary}}
						onPress={() => mudarGenero()}
					/>
					<Text style={{color: 'white'}}>{t('Prefiro não responder')}</Text>
				</View>
				<View style={{marginHorizontal: 30, marginTop: 20}}>
					<Text style={styles.txtTitulo}>{t('Minha Bio')}</Text>
					<TextInput
						mode="outlined"
						placeholder={t('Digite sua bio')}
						placeholderTextColor={Placeholder}
						outlineColor={biografia ? 'white' : 'transparent'}
						value={biografia}
						onChangeText={value => setBiografia(value)}
						style={styles.input1}
						multiline={true}
						theme={{
							roundness: 10,
							colors: {
								text: 'white',
								primary: 'white',
								placeholder: Placeholder,
							},
						}}
						render={innerProps => (
							<NativeTextInput
								{...innerProps}
								style={[
									innerProps.style,
									innerProps.multiline
										? {
												paddingTop: 8,
												paddingBottom: 8,
												height: 100,
										  }
										: null,
								]}
							/>
						)}
					/>
				</View>
				<View style={{marginTop: 20}}>
					<Text style={[styles.txtTitulo, {marginHorizontal: 30}]}>
						{t('Meus Interesses')}
					</Text>
					<View
						style={{
							flex: 1,
							flexDirection: 'row',
							flexWrap: 'wrap',
							marginTop: 20,
							marginHorizontal: 23,
						}}>
						{data.map(item => {
							return (
								<TouchableOpacity
									style={{
										width: '50%',
										alignItems: 'center',
										paddingHorizontal: 7,
										paddingBottom: 15,
									}}
									onPress={() => setInteresse(item.id)}
									key={item.id}>
									<ImageBackground
										source={{uri: item.image}}
										style={{
											width: '100%',
											height: 80,
											justifyContent: 'flex-end',
										}}
										resizeMode="cover"
										imageStyle={{
											borderRadius: 10,
											borderWidth: inter.includes(item.id) ? 2 : null,
											borderColor: inter.includes(item.id) ? '#DF1884' : null,
										}}>
										{Platform.select({
											ios: (
												<BlurView
													style={{
														height: 26,
														justifyContent: 'center',
														paddingHorizontal: 20,
														borderRadius: 10,
													}}
													blurType="light"
													blurAmount={0.1}
													reducedTransparencyFallbackColor="white">
													<Text
														style={{
															fontFamily: Titulo,
															fontSize: 12,
															color: 'white',
															fontWeight: 'bold',
														}}>
														{t(item.name)}
													</Text>
												</BlurView>
											),
											android: (
												<View
													style={[
														styles.styleViewBlur,
														{
															height: 26,
															justifyContent: 'center',
															paddingHorizontal: 20,
														},
													]}>
													<Text
														style={{
															fontFamily: Titulo,
															fontSize: 12,
															color: 'white',
															fontWeight: 'bold',
														}}>
														{t(item.name)}
													</Text>
												</View>
											),
										})}
									</ImageBackground>
								</TouchableOpacity>
							);
						})}
					</View>
				</View>
				<View style={{marginHorizontal: 30, paddingTop: 20}}>
				{
					loading ? <ActivityIndicator size="small" color={Primary} /> : <SaveCancelBar
						title={'Salvar'}
						callback={() => salvarFotos()}
						press={() => navigation.goBack()}
						disabled={loading}
					/>
				}
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};
const styles = StyleSheet.create({
	addPhotos: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: CinzaEscuro,
		borderRadius: 10,
		marginTop: 25,
		width: 300,
	},
	txtTitulo: {
		paddingTop: 20,
		fontSize: 12,
		fontWeight: '600',
		fontFamily: Descricao,
		color: '#B1A699',
	},
	input: {
		color: 'white',
		backgroundColor: CinzaEscuro,
		borderRadius: 10,
		height: 50,
		paddingVertical: 10,
	},
	dropdown: {
		backgroundColor: CinzaEscuro,
		marginTop: 20,
		borderRadius: 10,
		paddingHorizontal: 10,
		height: 50,
		justifyContent: 'center',
	},
	input1: {
		textAlignVertical: 'top',
		borderRadius: 10,
		height: 200,
		color: 'white',
		backgroundColor: CinzaEscuro,
		flex: 1,
		marginTop: 10,
	},
	fto: {
		fontFamily: Descricao,
		color: 'white',
	},
	item: {
		paddingVertical: 10,
		paddingHorizontal: 7,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	textItem: {
		flex: 1,
		fontSize: 16,
		fontFamily: Descricao,
		paddingHorizontal: 7,
	},
	styleViewBlur: {
		borderRadius: 10,
		shadowOpacity: 1,
		shadowColor: '#000',
		shadowOffset: {width: 10, height: 10},
		shadowRadius: 5,
		elevation: 5,
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
	},
});

const mapStateToProps = state => {
	const {user} = state.Auth;
	return {user};
};

export default connect(mapStateToProps, {retrive_user})(EditPerfil);

{
	/*
	.then(resp => {
			if(resp => true){
				props.retrive_user()
			}else{
				alert(response.message)
			}
		})
*/
}
