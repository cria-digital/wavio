import React, { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { Background, Titulo, Placeholder, CinzaEscuro } from '../../Styles'
import BackButtonSolid from '../../Components/Buttons/BackButtonSolid'
import GoButton from "../../Components/Buttons/GoButton"
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native'

import { translate } from '../../Locales'
const t = translate

import { connect } from 'react-redux';

import { HelpersPassword } from "../../Helpers";
const helpersPassword = new HelpersPassword(); 

const ChangePassword = (props) => {
	const [senhaAntiga, setSenhaAntiga] = useState('');
	const [viewSenha, setViewSenha] = useState(true)

	const [novaSenha, setNovaSenha] = useState('');
	const [viewSenhaNova, setViewSenhaNova] = useState(true)

	const [confirmSenha, setConfirmSenha] = useState('')
	const [confirmSenhaNova, setConfirmSenhaNova] = useState(false)

	const navigation = useNavigation();

	const sendNewPassword = (values) => {
		helpersPassword.changePassword({
				password: senhaAntiga,
  				new_password: confirmSenha,
  				id: props.user.id
			}).then(response => {
			if(response == true){
				navigation.goBack()
			}else{
				alert(response.error)
			}
		})
	}

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>
			<View style={{flex: 1, backgroundColor: Background}}>
				<View style={{paddingLeft: 30, paddingTop: 20}}>
					<BackButtonSolid callback={() => navigation.goBack()}/>
				</View>
				<Text style={{color: 'white', fontFamily: Titulo, fontSize: 28, padding: 30}}>
					{t("Alterar senha")}
				</Text>
				<View style={{paddingHorizontal: 30}}>
					<TextInput
					   mode='outlined'
					   label={t("Senha atual")}
					   secureTextEntrys
			      	right={
		      			<TextInput.Icon 
		      				name={viewSenha ? 'eye-outline' : 'eye-off-outline'} 
		      				color={Placeholder} 
		      				onPress={() => setViewSenha(!viewSenha)}
		      			/>
		      		}
		      		secureTextEntry={viewSenha}
					   placeholder={t("Digite a senha atual")}
					  	placeholderTextColor={Placeholder}
					   outlineColor={senhaAntiga ? "white" : "transparent"}
					   value={senhaAntiga}
					  	onChangeText={(value) => setSenhaAntiga(value)}
					   style={styles.input}
					   theme={{roundness: 10, colors: { text: 'white', primary: "white", placeholder: Placeholder } }}
					/>
					<TextInput
					   mode='outlined'
					   label={t("Nova senha")}
					   secureTextEntrys
			      	right={
		      			<TextInput.Icon 
		      				name={viewSenhaNova ? 'eye-outline' : 'eye-off-outline'} 
		      				color={Placeholder} 
		      				onPress={() => setViewSenhaNova(!viewSenhaNova)}
		      			/>
		      		}
		      		secureTextEntry={viewSenhaNova}
					   placeholder={t("Digite a nova senha")}
					  	placeholderTextColor={Placeholder}
					   outlineColor={novaSenha ? "white" : "transparent"}
					   value={novaSenha}
					  	onChangeText={(value) => setNovaSenha(value)}
					   style={styles.input}
					   theme={{roundness: 10, colors: { text: 'white', primary: "white", placeholder: Placeholder } }}
					/>
					<TextInput
					   mode='outlined'
					   label={t("Confirme a nova senha")}
					   secureTextEntry
			      	right={
		      			<TextInput.Icon 
		      				name={confirmSenhaNova ? 'eye-outline' : 'eye-off-outline'} 
		      				color={Placeholder} 
		      				onPress={() => setConfirmSenhaNova(!confirmSenhaNova)}
		      			/>
		      		}
		      		secureTextEntry={confirmSenhaNova}
					   placeholder={t("Digite novamente a nova senha")}
					  	placeholderTextColor={Placeholder}
					   outlineColor={confirmSenha ? "white" : "transparent"}
					   value={confirmSenha}
					  	onChangeText={(value) => setConfirmSenha(value)}
					   style={styles.input}
					   theme={{roundness: 10, colors: { text: 'white', primary: "white", placeholder: Placeholder } }}
					/>	
				</View>
				<View style={{justifyContent: 'flex-end', flex: 1, paddingRight: 30, paddingBottom: 20, alignItems: 'flex-end'}}>
					<GoButton width={160} title="Alterar senha" press={() => sendNewPassword()}/>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	input: {
  		color: 'white', 
  		backgroundColor: CinzaEscuro,
      borderRadius: 10, 
      height: 50,
      marginBottom: 20
  	},
})

const mapStateToProps = (state) => {
	const { user } = state.Auth;
   return { user };
};

export default connect(mapStateToProps)(ChangePassword);

