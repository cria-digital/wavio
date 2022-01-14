import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, StyleSheet, SafeAreaView } from 'react-native'
import { Background, Titulo, Descricao, Placeholder, CinzaEscuro, Primary } from '../../Styles'
import { TextInputMask } from 'react-native-masked-text'
import { TextInput, Checkbox } from 'react-native-paper';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import GoButton from '../../Components/Buttons/GoButton'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useNavigation } from '@react-navigation/native';

import { translate } from '../../Locales'
const t = translate

import { HelpersUser, HelpersInterests } from "../../Helpers";
const helpersUser = new HelpersUser();

const data = [
   {label: t('Masculino'), value: t('Masculino')},
  	{label: t('Feminino'), value: 'Faminino'},
  	{label: t('Outro'), value: t('Outro')}
];

import { connect } from 'react-redux';
import { retrive_user } from '../../Redux/actions';

const Welcome = (props) => {
	const [birthdate, setBirthdate] = useState('');
   const [dropdown, setDropdown] = useState(null);
   const [checkboxState, setCheckboxState] = useState(false);

   const navigation = useNavigation();

   useEffect(() => {
   	setBirthdate(props.user.birthdate ? props.user.birthdate : "");
   	if(props.user.genre == null){
   		setCheckboxState(true)
   	}else{
   		setDropdown(props.user.genre ? props.user.genre : false)
   	}
   }, [])
	
	const mudarGenero = () => {
		setCheckboxState(!checkboxState),
		setDropdown(null) 
	}

	const salvarInformacoes = () => {
		if(birthdate !== ''){
			if(dropdown !== null || checkboxState !== false){
				helpersUser.ModifydUser({...props.user, birthdate: birthdate, genre: dropdown})
				.then(resp => {
					if(resp => true){
						props.retrive_user();
						navigation.navigate('MyInterests')
					}else{
						alert(response.message)
					}
				})
			}else{
				alert('Preencha o seu gênero')
			}
		}else{
			alert('Preencha a data de anversário')
		}
	}

	const _renderItem = item => {
      return (
         <View style={styles.item}>
            <Text style={styles.textItem}>{item.label}</Text>
         </View>
      );
   };

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>
		<ScrollView contentContainerStyle={{flexGrow: 1}}
  			keyboardShouldPersistTaps='handled'
 			style={{flex: 1, backgroundColor: Background, padding:25}}>
			<View style={{flex: 1}}>
				<Text style={styles.titulo}>
				   {t("Bem Vindo")} {props.user.name}
				</Text>
				<Text style={styles.descricao}>
				  	{t("Antes de começar a utilizar nosso app")}, {t("gostaríamos de te conhecer um pouco mais")}.
				</Text>
				<TextInput
				  	mode='outlined'
					label={t("Data de Nascimento")}
					placeholderTextColor={Placeholder}
					outlineColor={birthdate ? "white" : "transparent"}
					style={styles.input}
					returnKeyType={'done'}
					value={birthdate}
					theme={{roundness: 10, colors: { text: 'white', primary: "white", placeholder: Placeholder } }}
				  	render={props =>
				    	<TextInputMask
				    		{...props}
			          	type={'custom'}
			          	options={{mask: '99/99/9999'}}
			          	underlineColorAndroid={'transparent'}
			          	onChangeText={birthdate =>  setBirthdate(birthdate)}
							keyboardType='numeric'
		          	/>
				  	}
				/>
				<View style={{paddingTop: 20}}>
					<Dropdown
	               style={styles.dropdown}
	               data={data}
	               labelField="label"
	               valueField="value"
	               placeholder={t("Gênero que se identifica")}
	               placeholderStyle={{fontFamily: Descricao, color:'white', fontSize: 14}}
	               selectedTextStyle={{fontFamily: Descricao, color:'white', fontSize: 14}}
	               maxHeight={120}
	               value={dropdown}
	               onChange={item => {
	                  setDropdown(item.value),
	                  setCheckboxState(false)
	               }}
	               renderItem={item => _renderItem(item)}
	            />
		      </View>
		      <View style={{paddingTop: 10, flexDirection: 'row', alignItems:'center'}}>
		      	<BouncyCheckbox
					   size={22}
						fillColor={Primary}
						isChecked={checkboxState}
						disableBuiltInState={true}
						ref={(ref: any) => (bouncyCheckboxRef = ref)}
						unfillColor={Background}
						iconStyle={{ borderColor: Primary }}
					   onPress={() => mudarGenero()}
					/>
					<Text style={{fontFamily: Descricao, color:'white'}}>
						{t("Prefiro não responder")}  
					</Text>
		      </View>
	      </View>
	      <View style={{flex:1, justifyContent: 'flex-end', alignItems: 'flex-end', marginButtom: 20}}>
	       	<GoButton width={100} press={() => salvarInformacoes()}/>
	      </View>
		</ScrollView>
		</SafeAreaView>
	)
}
const styles = StyleSheet.create({
	titulo: {
		fontFamily: Titulo,
		fontSize: 38,
		color: 'white'
	},
	descricao:{
		fontFamily: Descricao,
		fontSize: 14,
		color: 'white',
		marginVertical: 15
	},
	input: {
  		color: 'white', 
  		backgroundColor: CinzaEscuro,
      height: 50,
  	},
  	dropdown: {
      backgroundColor: CinzaEscuro,
      marginTop: 20,
      borderRadius: 10,
      paddingHorizontal: 10,
      height: 50,
      justifyContent: 'center'
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
})

const mapStateToProps = (state) => {
	const { user } = state.Auth;
   return { user };
};

export default connect(mapStateToProps, { retrive_user })(Welcome);