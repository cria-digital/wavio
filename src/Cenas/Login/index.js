import React, { useState, useEffect } from 'react'
import { NativeModules, View, Text, ImageBackground, SafeAreaView,  StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { Titulo, Descricao, Background, Placeholder, CinzaEscuro } from "../../Styles"
import GoButton from "../../Components/Buttons/GoButton"
import { TextInput } from 'react-native-paper';

import { translate } from '../../Locales'
const t = translate

import { HelpersAuth } from "../../Helpers";
const helpersAuth = new HelpersAuth(); 

import { AuthContext } from '../../../components/context';

import { Formik } from 'formik'
import * as yup from 'yup';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const index = ({navigation}) => {
	const [viewSenha, setViewSenha] = useState(true)

	const { signIn } = React.useContext(AuthContext)

	const loginHandle = (values) => {
		helpersAuth.Login(values.Email, values.password)
		.then(response => {
			if(response?.data?.token){
				signIn({
					username: response.data.user.name, 
      			userToken: response.data.token,
      			idUser: response.data.user.id
   			})
			}else{
				alert(response.message)
			}
		})
   }

   const cadastroValidationSchema = yup.object().shape({
      password: yup
         .string()
         .min(6, ({ min }) => t('A senha precisa ter')+" "+ min +" "+t('caracteres'))
         .required(t('Coloque uma senha')),
      Email: yup.string().email().required(t('Coloque seu e-mail')),
   })

	return (
		<ScrollView>
		<SafeAreaView style={{flex: 1, height: windowHeight, backgroundColor: Background}}>
			<ImageBackground 
				source={require("../../Images/Login/bg-login.png")}
				resizeMode="cover"
				style={styles.image}
			>
				<View style={[styles.container, {marginHorizontal: 25, justifyContent: 'center'}]}>
					<Text style={styles.descricao}>
						{t('Você está pronto para essa experiência')}
					</Text>
				</View>
			</ImageBackground>
			<Formik
	         validationSchema={cadastroValidationSchema}
	         initialValues={{ Email: '', password: ''}}
	         onSubmit={values => loginHandle(values)}
	      >
	         {({
	            handleChange,
	            handleBlur,
	            handleSubmit,
	            setFieldValue,
	            values,
	            errors,
	            isValid
	         }) => (
	            <>
					<View style={styles.containerInferior}>
						<TextInput
							autoCapitalize='none'
						   mode='outlined'
						   label={t("E-mail")}
						   placeholder={t("Digite seu e-mail")}
						   placeholderTextColor={Placeholder}
						   outlineColor={values.Email ? "white" : "transparent"}
						  	onChangeText={handleChange('Email')}
	                  onBlur={handleBlur('Email')}
	                  value={values.Email} 
						   style={styles.input}
						   theme={{roundness: 10, colors: { text: 'white', primary: "white", placeholder: Placeholder } }}
						   keyboardType='email-address'
					   />
					   {errors.Email &&
	                  <Text style={styles.erros}>{errors.Email}</Text>
	               }
						<TextInput
							autoCapitalize='none'
						   mode='outlined'
						   label={t("Senha")}
				      	right={
				      		<TextInput.Icon 
				      			name={viewSenha ? 'eye-outline' : 'eye-off-outline'} 
				      			color={Placeholder} onPress={() => setViewSenha(!viewSenha)}/>
				      	}
				      	onChangeText={handleChange('password')}
	                  onBlur={handleBlur('password')}
	                  value={values.password} 
						   placeholder={t("Digite sua senha")}
						  	placeholderTextColor={Placeholder}
						   outlineColor={values.password ? "white" : "transparent"}
						   secureTextEntry={viewSenha}
						   style={styles.input}
						   theme={{roundness: 10, colors: { text: 'white', primary: "white", placeholder: Placeholder } }}
						/>	
						{errors.password &&
	                  <Text style={styles.erros}>{errors.password}</Text>
	               }
					   <View style={{flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between'}}>
					   	<TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{width: 80}}>
					   		<Text style={styles.recSenha}>{t("Esqueci minha senha")}</Text>
					   	</TouchableOpacity>
					   	<GoButton width={140} title={"Acessar"} press={handleSubmit} valid={!isValid}/>
					   </View>
					</View>
					</>
	         )}
	      </Formik>
			<View style={{backgroundColor: Background}}>
				<View style={{height: 2, marginHorizontal: 20, backgroundColor: "#3C3C3C"}} />
			</View>
			<View style={{flex: 2, backgroundColor: Background, justifyContent: "space-between"}}>
				<View style={{flexDirection: "row", justifyContent:  "center", marginTop: 10}}>
					<Text style={styles.txtPonta}>{t("Ou")}</Text>
					<Text style={styles.txtMeio}> {t("acesse")} </Text>
					<Text style={styles.txtPonta}>{t("com")}:</Text>
				</View>
				<View style={{flexDirection: "row"}}>
					<TouchableOpacity style={styles.socialButton}>
						<Text style={styles.txtButton}>Google</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.socialButton}>
						<Text style={styles.txtButton}>Facebook</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.lastContainer}>
					<Text style={styles.txtPonta}>{t("Ainda não possui uma conta")}? </Text>
					<TouchableOpacity onPress={() => navigation.navigate('Subscribe')}>
						<Text style={styles.txtCreateAcount}> {t("Clique aqui")}!</Text>
					</TouchableOpacity>
				</View>
			</View>
		</SafeAreaView>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
  	},
  	descricao: {
      fontFamily: Titulo,
      fontSize: 38,
      color: "white"
   },
  	image: {
    	flex: 3,
  	},
  	containerInferior: {
  		flex: 3,
  		backgroundColor: Background, 
  		justifyContent: 'space-around'
  	},
  	input: {
  		color: 'white', 
  		backgroundColor: CinzaEscuro,
      borderRadius: 10, 
      height: 50,
      marginHorizontal: 20,
      
  	},
  	botoes: {
  		flexDirection: "row",
  		alignItems: 'center',
  		backgroundColor: "red"
  	},
  	recSenha: {
  		fontFamily: Descricao, 
  		color: "white", 
  		textDecorationLine: 'underline',
  		fontSize: 14 
  	},
  	txtPonta:{
  		fontFamily: Descricao,
  		fontSize: 14,
  		color: "white",
  		textAlign: 'center'
  	},
  	txtMeio: {
  		fontFamily: Descricao,
  		fontSize: 14,
  		color: "white",
  		fontWeight: 'bold'
  	},
  	separador: {
		borderWidth: 1, 
		borderColor: '#3C3C3C', 
		marginLeft: 10,
		backgroundColor: "red"
	},
	socialButton: {
		flex: 1,
		borderColor: "white",
		borderWidth: 1,
		borderRadius: 20,
		height: 56,
		marginHorizontal: 23,
		alignItems: "center",
		justifyContent: "center"
	},
	txtButton: {
		fontFamily: Descricao,
		fontSize: 14,
		color: "white",
		fontWeight: 'bold'
	},
	lastContainer: {
		height: 53, 
		backgroundColor: '#333333', 
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center" 
	},
	txtCreateAcount: {
		fontFamily: Descricao,
		fontSize: 14,
		color: "white",
		textDecorationLine: 'underline',
		fontWeight: 'bold'
	},
	erros: { 
      fontSize: 12, 
      color: 'red', 
      fontFamily: Descricao,
      paddingHorizontal: 20
   },
})

export default index