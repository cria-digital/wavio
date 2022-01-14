import React, { useState, useEffect, useRef } from 'react'
import { ScrollView, Dimensions, SafeAreaView, View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import { Background, Titulo, Descricao, Primary } from '../../Styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { BlurView } from "@react-native-community/blur";
import LinearGradient from 'react-native-linear-gradient'
import Carousel from 'react-native-snap-carousel';

import { translate } from '../../Locales'
const t = translate

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { HelpersUser, HelpersInterests, HelpersFollowers } from "../../Helpers";
const helpersUser = new HelpersUser();
const helpersInterests = new HelpersInterests();
const helpersFollowers = new HelpersFollowers();

const PerfilPublico = (props) => {
	const [seguindo, setSeguindo] = useState(false);
	const [user, setUser] = useState([])
	const [selectInter, setSelectInter] = useState([])
	const [idSeguidor, setIdSeguidor] = useState()

	useEffect(() => {
		buscarperfil();
		verificaSeguindo()
	}, [props.item])

	const buscarperfil = () => {
		helpersUser.GetUserDinamic(props.item).then(response => {
			setUser(response);
			procurar(response.interests)
		})
	}

	const verificaSeguindo = () => {
		helpersFollowers.GetFollowing(props.meu_id).then(response => {
			const seguindo = []
			response.data.forEach(item => {
				seguindo.push(item.target._id);
				item.target._id == props.item ? setIdSeguidor(item._id) : null
			})
			const findSeguindo = seguindo.includes(props.item)
			findSeguindo ? setSeguindo(true) : setSeguindo(false)
		})
	}

	const seguir = () => {
		helpersFollowers.Following(props.meu_id, props.item)
		.then(response => {
			buscarperfil();
			verificaSeguindo();
			props.attUser()
		})
	}

	const deixarSeguir = () => {
		helpersFollowers.Unfollow(idSeguidor)
		.then(response => {
			response ? (
				buscarperfil(),
				verificaSeguindo(),
				props.attUser()
			) : alert('Ocorreu um erro')
		})
	}

	const procurar = (inter) => {
		helpersInterests.GetInterests()
		.then(response => {
			const data = []
			response.data.forEach(item => inter.includes(item.id) ? data.push(item) : null);
			setSelectInter(data)
		})
	}
		

	const renderIdade = (aniversario) => {
   	var day1 = new Date(aniversario);
		var day2 = new Date();

		var difference = day2.getFullYear()-day1.getFullYear();

		return difference
   } 

   const carrossel = useRef();

   const _renderItem = ({item, index}) => {
      return (
        	<ImageBackground
        		style={{
            	height: windowWidth
            }}
        		source={{uri: item.url || item.uri}}
        		resizeMode='cover'
        	> 	
        		{
					Platform.select({
						ios: <BlurView
							style={{height:32}}
							blurType="light"
							blurAmount={0.1}
							reducedTransparencyFallbackColor="white"
						>
							<TouchableOpacity 
								onPress={() => props.dismiss()} 
								style={{width: '100%', justifyContent:'center', alignItems: 'center'}}
							>
								<Icon 
				      			name="chevron-down-outline" 
				      			size={30} color={'white'} 
				      		/>
							</TouchableOpacity>
						</BlurView>,
						android: <TouchableOpacity	
							style={[styles.styleViewBlur, {height:32, justifyContent:'center',  alignItems: 'center'}]}
							onPress={() => props.dismiss()}
						>
							<Icon 
			      			name="chevron-down-outline" 
			      			size={30} color={'white'}
			      		/>
						</TouchableOpacity>
					})
				}
        		<View style={{alignItems: 'flex-end', padding: 20}}>
	      		<Icon name="share-outline" size={23} color={'white'} />
	      	</View>
	      	<View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', padding: 20}}>
	      		<Icon 
	      			name="chevron-back-circle-outline" 
	      			size={30} color={'white'} 
	      			onPress={() => {carrossel.current.snapToPrev(animated = false)}}
	      		/>
	      		<Icon 
	      			name="chevron-forward-circle-outline" 
	      			size={30} color={'white'} 
	      			onPress={() => {carrossel.current.snapToNext(animated = false)}}
	      		/>
	      	</View>
        	</ImageBackground>
      )
   }

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>
			<ScrollView contentContainerStyle={{flexGrow: 1}}>
			<Carousel
	         layout={'default'}
	         layoutCardOffset={14}
	         ref={carrossel}
	         data={user.photos}
	         sliderWidth={windowWidth}
	         itemWidth={windowWidth}
	         renderItem={_renderItem}
	         useScrollView={true}
	         //containerCustomStyle={{ height: windowWidth, backgroundColor: 'red'}}
	         //slideStyle={{ flex: 1}}
	         //onSnapToItem={index => procurarFoto(index)} 
	      />
      	<View style={{flex: 1}}>
      		<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      			<Text style={styles.txt}>
      		  		{user.name},
      			</Text>
      			<Text style={styles.txt}>
      		  		{renderIdade(user.birthdate)} {t("anos")}
      			</Text>
      		</View>
     			<View style={{marginHorizontal: 40, flexDirection: 'row', flex: 1, alignItems: 'center'}}>
      			{/*<View style={styles.containerNumeros}>
      				<Text style={styles.txtNumeros}>
      					{t("Referências")}
      				</Text>
      				<Text style={styles.numero}>
      				  	falta 
      				</Text>
      			</View>*/}
      			<View style={styles.containerNumeros}>
      				<Text style={styles.txtNumeros}>
      				  	{t("Seguidores")}
      				</Text>
      				<Text style={styles.numero}>
      				  	{user.followers}
      				</Text>
      			</View>
      			<View style={styles.containerNumeros}>
      				<Text style={styles.txtNumeros}>
      				  	{t("Seguindo")}
      				</Text>
      				<Text style={styles.numero}>
      				  	{user.following}
      				</Text>
      			</View>
      		</View>
      		{
      			seguindo ?  
     				<View style={{flex: 1, justifyContent: 'center', flexDirection: 'row'}}>
     					<TouchableOpacity style={styles.containerSeg} onPress={() => deixarSeguir()}>
     						<Text style={{fontFamily: Descricao, fontSize: 14, fontWeight: '700', color: 'white' }}>
			         		{t("Seguindo")} 
			         	</Text>
     					</TouchableOpacity>
     					<TouchableOpacity style={{flex: 2}} onPress={() => props.sendMessage()}>
     						<LinearGradient colors={['#eba358', '#df1884']} style={styles.gradient1}>
			         		<Text style={{fontFamily: Descricao, fontSize: 14, fontWeight: '700', color: 'white' }}>
			         		  	{t("Mandar mensagem")}
			         		</Text>
			         	</LinearGradient>
     					</TouchableOpacity>
     				</View>
     				:
     				<View style={{flex: 1, justifyContent: 'center'}}>
	     				<TouchableOpacity onPress={() => seguir()}>
		     				<LinearGradient colors={['#eba358', '#df1884']} style={styles.gradient}>
			         		<Text style={{fontFamily: Descricao, fontSize: 14, fontWeight: '700', color: 'white' }}>
			         		  	{t("Seguir")}
			         		</Text>
			         	</LinearGradient>
		         	</TouchableOpacity>
     				</View>
      		}
      	</View>
      	<View style={{flex: 1}}>
      		{
      			user.biography ? <View>
	      			<Text style={styles.txtTitulo}>
	      			 	Minha Bio
	      			</Text>
	      			<Text style={styles.txtDescricao}>
	      			  	{user.biography}
	      			</Text>
      			</View> : null
      		}
      		
      		<View>
      			<Text style={styles.txtTitulo}>
      			 	{t("Meus interesses")}
      			</Text>
      			<View style={{flexDirection: 'row', paddingHorizontal: 30, paddingTop: 5}}>
      				{
      					selectInter.map((item, index) => {
      						return(
			      				<TouchableOpacity style={{backgroundColor: Primary, padding: 5, marginVertical: 5, marginRight: 5, borderRadius: 10}} key={index}>
			      				  <Text style={styles.interes}>
			      			 			{t(item.name)}
			      					</Text>
			      				</TouchableOpacity> 
      						)
      					})
      				}
      			</View>
      		</View>
      	</View>
      	</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	txt: {
		fontFamily: Titulo,
		color: 'white',
		fontSize: 18
	},
	containerNumeros: {
		flex: 1, 
		alignItems: 'center'
	},
	txtNumeros: {
		fontFamily: Descricao, 
		fontSize: 12, 
		fontWeight: '600', 
		color: '#B1A699',
	},
	numero: {
		fontFamily: Titulo,
		fontSize: 18,
		color: 'white'
	},
	gradient: {
		marginHorizontal: 20,
		height: 53,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center'
	},
	gradient1: {
		height: 53,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 5, 
		marginRight: 30
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
		paddingTop: 10,
		fontSize: 14,
		fontWeight: '400',
		fontFamily: Descricao,
		color: 'white'
	},
	interes: {
		fontFamily: Descricao,
		fontSize: 12, 
		fontWeight: '600',
		color: 'white'
	},
	containerSeg: {
		height: 52, 
		borderColor: Primary, 
		borderWidth: 1, 
		flex: 1, 
		justifyContent: 'center', 
		alignItems: 'center', 
		marginRight: 5, 
		marginLeft: 30, 
		borderRadius: 20
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

export default PerfilPublico