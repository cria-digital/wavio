import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, ImageBackground, Dimensions, ScrollView  } from 'react-native'
import { Background, Titulo, Descricao, Placeholder, CinzaEscuro, DescricaoBold } from "../../Styles"
import BackButtonSolid from "../../Components/Buttons/BackButtonSolid"
import GoButton from "../../Components/Buttons/GoButton"
import OtpInputCode from '../../Components/OtpInputCode'
import { TextInput} from 'react-native-paper';
const windowHeight = Dimensions.get('window').height;

import { translate } from '../../Locales'
const t = translate

import { HelpersPassword } from "../../Helpers";
const helpersPassword = new HelpersPassword(); 

import { Formik } from 'formik'
import * as yup from 'yup';

const ForgotPassword = ({navigation}) => {
	const [Email, setEmail] = useState('');
	const [password, setPassword] = useState('')
	const [status, setStatus] = useState('')
	const [code, setCode] = useState('')
	const [viewSenha, setViewSenha] = useState(true)
	const [viewNewSenha, setViewNewSenha] = useState(true)

	const sendCode = () => {
		helpersPassword.sendCode(Email).then(response => {
			if(response == true){
				setStatus('sendCode')
			}else{
				alert(response.message)
			}
		})
	}

	const validCode = () => {
		helpersPassword.validateCode(Email, code).then(response => {
			if(response == true){
				setStatus('forgot')
			}else{
				alert(response.message)
			}
		})
	}

	const sendNewPassword = (values) => {
		helpersPassword.sendNewPassword({
			email: Email,
			password: values.confirmPassword,
			code: code
		}).then(response => {
			if(response == true){
				navigation.navigate('Login')
			}else{
				alert(response.message)
			}
		})
	}

	const cadastroValidationSchema = yup.object().shape({
      password: yup
         .string()
         .min(6, ({ min }) => `A senha precisa ter ${min} caracteres`)
         .required('Coloque uma senha!'),
      confirmPassword: yup
         .string()
         .min(6, ({ min }) => `A senha precisa ter ${min} caracteres`)
         .oneOf([yup.ref('password')], 'As senhas não conferem')
         .required('Confirme sua senha'),
   })

	const renderItems = () => {
		if(status == ''){
			return (
				<View style={{flex: 1, justifyContent: 'space-between'}}>
					<View style={{flex: 1, margin: 25}}>
						<Text style={styles.descricao}>
							{t("Basta preencher o seu e-mail da cadastro no campo abaixo, que enviaremos um código para que você possa redefinir a sua senha")}
						</Text>
						<TextInput
							mode='outlined'
							label={t("E-mail")}
							placeholder={t("Digite seu e-mail")}
							placeholderTextColor={Placeholder}
							outlineColor={Email ? "white" : "transparent"}
							value={Email}
							keyboardType={'email-address'}
							autoCapitalize='none'
							onChangeText={(value) => setEmail(value)}
							style={[styles.input, {paddingTop: 25}]}
							theme={{roundness: 10, colors: { text: 'white', primary: "white", placeholder: Placeholder } }}
						/>   	
					</View>
					<View style={{flex:1, justifyContent: 'flex-end', margin: 25, alignItems: 'flex-end' }}>
						<GoButton width={100} press={() => sendCode()} />
					</View>	
				</View>
			)
		}else if(status == 'sendCode'){
			return (
				<View style={{flex: 1, justifyContent: 'space-between'}}>
					<View style={{flex: 1, margin: 25}}>
						<Text style={styles.descricao}>
							Digite abaixo o código que enviamos para o seu e-mail para redefinição de sua senha.
						</Text>
						<OtpInputCode code={(resp) => setCode(resp)}/>
						   
						<View style={{flexDirection: 'row'}}>
						   <Text style={{ fontFamily: Descricao, color:'white'}}>
						     	Não recebeu o código ainda?   <Text 
						     		style={{ fontFamily: Descricao, color:'white', fontWeight: 'bold', textDecorationLine: 'underline'}}
						     		onPress={() => sendCode()}
						     	>Reenviar código
						     	</Text>
						   </Text>
						</View>		
					</View>
					<View style={{flex:1, justifyContent: 'flex-end', margin: 25, alignItems: 'flex-end' }}>
						<GoButton width={100} press={() => validCode()} />
					</View>	
				</View>
			)
		}else if(status == 'forgot'){
			return (
				<View style={{flex: 1, justifyContent: 'space-between'}}>
					<Formik
		            validationSchema={cadastroValidationSchema}
		           	initialValues={{password: '', confirmPassword: ''}}
		            onSubmit={values => sendNewPassword(values)}
		         >
		            {({
		               handleChange,
		               handleBlur,
		               handleSubmit,
		               values,
		               errors,
		               isValid
		            }) => (
		            <>
							<View style={{flex: 1, margin: 25, justifyContent:'space-between'}}>
							   <TextInput
								   mode='outlined'
								   name="password"
								   label="Senha"
								   placeholder="Digite sua senha"
								   placeholderTextColor={Placeholder}
								   right={
				      				<TextInput.Icon name={viewSenha ? 'eye-outline' : 'eye-off-outline'} color={Placeholder} onPress={() => setViewSenha(!viewSenha)}/>
				      			}
				      			secureTextEntry={viewSenha}
								   outlineColor={'transparent'}
								   onChangeText={handleChange('password')}
		                     onBlur={handleBlur('password')}
		                     value={values.password} 
								   style={styles.input}
								   theme={{roundness: 10, colors: { text: 'white', primary: errors.password ? 'red' : 'white', placeholder: Placeholder } }}
							   />
							   {errors.password ?
		                     <Text style={styles.erros}>{errors.password}</Text> : 
		                     <Text style={styles.erros} />
		                  }
							   <TextInput
								   mode='outlined'
								   name="confirmPassword"
								   label="Senha"
								   placeholder="Confirmar senha"
								   placeholderTextColor={Placeholder}
								   right={
				      				<TextInput.Icon name={viewNewSenha ? 'eye-outline' : 'eye-off-outline'} color={Placeholder} onPress={() => setViewNewSenha(!viewNewSenha)}/>
				      			}
				      			secureTextEntry={viewNewSenha}
								   outlineColor={errors.confirmPassword ? 'red' : values.confirmPassword ? 'green' : 'transparent'}
								   onChangeText={handleChange('confirmPassword')}
								   onBlur={handleBlur('confirmPassword')}
								   value={values.confirmPassword} 
								   style={styles.input}
								   theme={{roundness: 10, colors: { text: 'white', primary: errors.confirmPassword ? 'red' : '#8AF470', placeholder: Placeholder } }}
							   />

							   {errors.confirmPassword ? 
		                     <Text style={styles.erros}>{errors.confirmPassword}</Text> 
		                     :
		                     values.confirmPassword ? 
		                     <Text style={styles.acerto}>Senhas conferem</Text>
		                     : null
		                      
		                  }
							</View>
							<View style={{flex:1, justifyContent: 'flex-end', margin: 25, alignItems: 'flex-end' }}>
								<GoButton width={100} valid={!isValid} press={handleSubmit}/>
							</View>	
					 	</>
		           	)}
		         </Formik>
					
				</View>
			)
		}
	}

	return (
		<SafeAreaView style={{flex: 1, height: windowHeight, backgroundColor: Background}}>
			<ScrollView contentContainerStyle={{flexGrow: 1}}> 
				<View style={styles.container}>
					<ImageBackground
						source={require("../../Images/Login/bg-forgotPassword.png")}	
						resizeMode="cover"
						style={styles.image}
					>
						<View style={[styles.container, 
							{	margin: 25,
								justifyContent: "space-between"
							}]}
						>
							<BackButtonSolid  callback={() => navigation.goBack()}/>
							<Text style={styles.titulo}>
								{ 	status == 'sendCode' ? 
										'Código enviado'
									: status == 'forgot' ? 'Redefinir sua senha!'	
									: t('Recuperar a sua senha é fácil')
								}
							</Text>
						</View>
					</ImageBackground>
				</View>
				<View style={styles.containerInferior}>
					{renderItems()}
				</View>
			</ScrollView>	
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	image: {
    	flex: 1,
  	},
  	titulo: {
      fontFamily: Titulo,
      fontSize: 38,
      color: "white"
   },
  	containerInferior: {
		flex: 1,
		backgroundColor: Background
	},
	descricao: {
  		fontFamily: Descricao, 
  		color: "white", 
  		fontSize: 14 
  	},
  	input: {
  		color: 'white', 
  		backgroundColor: CinzaEscuro,
      height: 50,
      //paddingTop: 25
  	},
  	underlineStyleHighLighted: {
    	borderColor: "#03DAC6"
  },
  	underlineStyleBase: {
    	width: 30,
    	height: 45,
    	borderWidth: 0,
    	borderBottomWidth: 1,
  	},
  	erros: { 
      fontSize: 12, 
      color: 'red', 
      fontFamily: Descricao,
      paddingVertical:8
   },
   acerto: {
   	fontSize: 12, 
      color: '#8AF470', 
      fontFamily: Descricao,
     	paddingVertical:8
   }
})

export default ForgotPassword

/*
const renderitems = () =>{
				<View style={{flex: 1, margin: 25}}>
					<Text style={styles.descricao}>
						{ 	test == 'sendCode' ? 
									'Digite abaixo o código que enviamos para o seu e-mail para redefinição de sua senha.'
								: test == 'forgot' ? ''	
								: 'Basta preencher o seu e-mail da cadastro no campo abaixo, que enviaremos um código para que você possa redefinir a sua senha.'
						}
						</Text>
					<TextInput
						mode='outlined'
						label="E-mail"
						placeholder="Digite seu e-mail"
						placeholderTextColor={Placeholder}
						outlineColor={Email ? "white" : "transparent"}
						value={Email}
						onChangeText={(value) => setEmail(value)}
						style={styles.input}
						theme={{roundness: 10, colors: { text: 'white', primary: "white", placeholder: Placeholder } }}
				   />
				   {
				   	
				   }
				   <View style={{flexDirection: 'row', paddingTop:10}}>
				   	<Text style={{ fontFamily: Descricao, color:'white'}}>
				     		Não recebeu o código ainda? <Text style={{ fontFamily: Descricao, color:'white', fontWeight: 'bold', textDecorationLine: 'underline', }}>Reenviar código	</Text>
				   	</Text>
				   </View>
				</View>
				<View style={{ justifyContent: 'flex-end', margin: 25, alignItems: 'flex-end', }}>
					<GoButton width={100}/>
				</View>		
	}
*/