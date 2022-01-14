import React, { useState, useRef, useEffect } from 'react'
import { View, Text, ScrollView, ImageBackground, StyleSheet, Dimensions, TouchableOpacity, Button, SafeAreaView, Modal } from 'react-native'
import { Background, Titulo, Descricao, Primary } from  '../../Styles'
import TabNavigator from '../../Components/TabNavigator'
import Header from '../../Components/Header'
import Icon from 'react-native-vector-icons/Ionicons';
import NextButton from '../../Components/Buttons/NextButton'
import Carousel from 'react-native-snap-carousel';

import { translate } from '../../Locales'
const t = translate

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { HelpersInterests } from "../../Helpers";
const helpersInterests = new HelpersInterests();

import { connect } from 'react-redux';
import { toggle_tab } from '../../Redux/actions';

import { AuthContext } from '../../../components/context'; 

import { useNavigation } from '@react-navigation/native';

const index = (props) => {
	const [modalVisible, setModalVisible] = useState(false);
	const [inter, setInter] = useState(props.user.interests);
	const [selectInter, setSelectInter] = useState([])

	useEffect(() => {
		helpersInterests.GetInterests()
		.then(response => {
			const data = []
			response.data.forEach(item => inter.includes(item.id) ? data.push(item) : null);
			setSelectInter(data)
		})
	}, [])

	const navigation = useNavigation();

	const carrossel = useRef();

	const { signOut } = React.useContext(AuthContext);

	const _renderItem = ({item, index}) => {
      return (
        	<ImageBackground
        		style={{ borderRadius: 5, height: windowWidth }}
        		source={{uri: item.url}}
        		resizeMode='cover'
        	> 
        		<View style={{flex: 1, alignItems: 'flex-end', padding: 20}}>
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

   const renderIdade = (aniversario) => {
   	var day1 = new Date(aniversario);
		var day2 = new Date();

		var difference = day2.getYear()-day1.getYear();

		return difference
   } 

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>
			<ScrollView>
				<Header user={props.user} press={() => null} profile={true} pressIcon={() => setModalVisible(true)}/>
				<Carousel
	            layout={'default'}
	            layoutCardOffset={14}
	            ref={carrossel}
	            data={props.user.photos}
	            sliderWidth={windowWidth}
	            itemWidth={windowWidth}
	            renderItem={_renderItem}
	            useScrollView={true}
	            //containerCustomStyle={{ flex: 1 }}
	          	//slideStyle={{ flex: 1}}
	            //onSnapToItem={index => procurarFoto(index)} 
	         />
      		<View style={{flexDirection: 'row', paddingLeft: 30, alignItems: 'center', paddingTop: 20}}>
      			<Text style={{color: 'white', fontFamily: Titulo, fontSize: 18, paddingRight: 10}}>
      			  	{props.user.name}
      			</Text>
      			<Icon name="checkmark-circle" size={16} color={'#8AF470'} />
      		</View>
      		<Text style={{color: 'white', fontFamily: Titulo, fontSize: 18, paddingRight: 10, paddingLeft: 30,}}>
      			{renderIdade(props.user.birthdate)} anos
      		</Text>
      		<View style={{marginHorizontal: 40, flex: 1, height: 54, flexDirection: 'row', marginTop: 20}}>
      			{/*<TouchableOpacity 
      				style={styles.containerNumeros}
      				onPress={() => navigation.navigate('Seguidores', {aba: 'Referências', id: props.user.id})}
      			>
      				<Text style={styles.txtNumeros}>
      					{t("Referências")}
      				</Text>
      				<Text style={styles.numero}>
      				  	falta
      				</Text>
      			</TouchableOpacity>*/}
      			<TouchableOpacity 
      				style={styles.containerNumeros}
      				onPress={() => navigation.navigate('Seguidores', {aba: 'Seguidores', id: props.user.id})}
      			>
      				<Text style={styles.txtNumeros}>
      				  	{t("Seguidores")}
      				</Text>
      				<Text style={styles.numero}>
      				  	{props.user.followers}
      				</Text>
      			</TouchableOpacity>
      			<TouchableOpacity 
      				style={styles.containerNumeros}
      				onPress={() => navigation.navigate('Seguidores', {aba: 'Seguindo', id: props.user.id})}
      			>
      				<Text style={styles.txtNumeros}>
      				  	{t("Seguindo")}
      				</Text>
      				<Text style={styles.numero}>
      				  	{props.user.following}
      				</Text>
      			</TouchableOpacity>
      		</View>
      		{
      			props.user.biography ? <View>
	      			<Text style={styles.txtTitulo}>
	      			 	{t("Minha Bio")}
	      			</Text>
	      			<Text style={styles.txtDescricao}>
	      				{props.user.biography}
	      			</Text>
      			</View> : null
      		}
      		
      		<View>
      			<Text style={styles.txtTitulo}>
      			 	{t("Meus interesses")}
      			</Text>
      			<View style={{flexDirection: 'row', paddingHorizontal: 30, paddingTop: 5}} >
	      			{
	      				selectInter.map((item) => {
	      					return(
				      			<TouchableOpacity style={{backgroundColor: Primary, padding: 5, margin: 5, borderRadius: 10}} key={item.id}>
				      				 <Text style={styles.interes}>
				      			 		{t(item.name)}
				      				</Text>
				      			</TouchableOpacity> 
				      			
	      					)
	      				})
	      			}
      			</View>
      		</View>
      		<ImageBackground 
		         source={require("../../Images/UI/Group1794.png")} 
		         resizeMode="cover" 
		         style={{width: 'auto', height: 189, marginTop: 20, marginHorizontal: 30 }}
      		>	
      			<View style={{flex:1, padding: 20}}>
	      			<Text style={{fontFamily: Titulo, fontSize: 28, color: 'white'}}>
		      			{t("Conheça o")}
		      		</Text>
		      		<Text style={{fontFamily: Titulo, fontSize: 28, color: 'white'}}>
		      			{t("Wavio Plus+")}	  
		      		</Text>
      			</View>
      			<View style={{flex:1, alignItems: 'flex-end', paddingRight: 20}}>
      				<NextButton callback={() => navigation.navigate("Planos")}/>
      			</View>
      		</ImageBackground>
      		<View style={{height: 130}}/>
			</ScrollView>
			<Modal
	        	animationType="slide"
	        	transparent={true}
	        	visible={modalVisible}
	        	onRequestClose={() => setModalVisible(!modalVisible)}
      	>
	        	<SafeAreaView style={styles.centeredView}>
          		<View style={styles.modalView}>
	          		<View style={styles.menu}>
	          			<TouchableOpacity 
	          				onPress={() => setModalVisible(!modalVisible)} 
	          				style={{ alignItems: 'center'}}
	          			>
	          				<Icon name="chevron-down-outline" size={30} color={'white'} />
	          			</TouchableOpacity>
	          			<TouchableOpacity 
	          				style={[styles.viewMenu, {justifyContent: 'space-between', borderBottomWidth:0.8, borderColor: '#FFFFFF'}]}
	          				onPress={() => { setModalVisible(!modalVisible), navigation.navigate('EditPerfil')}}
	          			>
	          				<Text style={styles.txtItemMenu}>
	          				  	{t("Editar informações do perfil")}
	          				</Text>
	          				<Icon name="arrow-forward-outline" size={26} color={'white'} />
	          			</TouchableOpacity>
	          			<TouchableOpacity 
	          				style={[styles.viewMenu, {justifyContent: 'space-between', borderBottomWidth:0.8, borderColor: '#FFFFFF'}]}
	          				onPress={() => { setModalVisible(!modalVisible), navigation.navigate('ChangePassword') }} 
	          			>
	          				<Text style={styles.txtItemMenu}>
	          				  	{t("Alterar senha")}
	          				</Text>
	          				<Icon name="arrow-forward-outline" size={26} color={'white'} />
	          			</TouchableOpacity>
	          			<TouchableOpacity 
	          				style={[styles.viewMenu, {justifyContent: 'space-between', borderBottomWidth:0.8, borderColor: '#FFFFFF'}]}
	          				onPress={() => { setModalVisible(!modalVisible), navigation.navigate('Configuracoes') }} 
	          			>
	          				<Text style={styles.txtItemMenu}>
	          				  	{t("Configurações")}
	          				</Text>
	          				<Icon name="arrow-forward-outline" size={26} color={'white'} />
	          			</TouchableOpacity>
	          			<TouchableOpacity 
	          				style={[styles.viewMenu, {justifyContent: 'space-between', borderBottomWidth:0.8, borderColor: '#FFFFFF'}]}
	          				onPress={() => { setModalVisible(!modalVisible), navigation.navigate('Planos') }} 
	          			>
	          				<Text style={styles.txtItemMenu}>
	          				  	{t("Planos")}
	          				</Text>
	          				<Icon name="arrow-forward-outline" size={26} color={'white'} />
	          			</TouchableOpacity>
	          			<TouchableOpacity 
	          				style={[styles.viewMenu, {justifyContent: 'space-between'}]}
	          				onPress={() => { setModalVisible(!modalVisible), signOut() }} 
	          			>
	          				<Text style={styles.txtItemMenu}>
	          				  	{t("Sair")}
	          				</Text>
	          				<Icon name="arrow-forward-outline" size={26} color={'white'} />
	          			</TouchableOpacity>
	          		</View>
		      	</View>
		      </SafeAreaView>
      	</Modal>
			<TabNavigator  callback={(value) => props.toggle_tab(value)}/>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	containerNumeros: {
		flex: 1, 
		alignItems: 'center'
	},
	txtNumeros: {
		fontFamily: Descricao, 
		fontSize: 12, 
		fontWeight: '600', 
		color: '#B1A699',
		marginTop: 5
	},
	numero: {
		fontFamily: Titulo,
		fontSize: 18,
		color: 'white'
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
	interes: {
		fontFamily: Descricao,
		fontSize: 12, 
		fontWeight: '600',
		color: 'white'
	},
	centeredView: {
    	flex: 1,
    	justifyContent: "flex-end",
    	backgroundColor: 'rgba(0,0,0,0.4)'
  	},
  	modalView: {
    	shadowColor: "#000",
    	shadowOffset: {
      	width: 0,
      	height: 2
    	},
    	shadowOpacity: 0.25,
    	shadowRadius: 4,
    	elevation: 5
  	},
  	menu: {
  		height: 203, 
  		backgroundColor: '#424343',
  		borderTopLeftRadius: 20,
  		borderTopRightRadius: 20
  	},
  	viewMenu: {
  		flex: 1,
  		flexDirection: 'row',
  		paddingHorizontal: 20,
  		alignItems: 'center'
  	},
  	txtItemMenu: {
  		fontFamily: Descricao,
  		fontWeight: '700',
  		fontSize: 14,
  		color: 'white'
  	}
})

const mapStateToProps = (state) => {
	const { user } = state.Auth;
   return { user };
};

export default connect(mapStateToProps, { toggle_tab })(index);