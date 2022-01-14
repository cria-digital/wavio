import React, {useState} from 'react'
import { View, Text, ImageBackground, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity, ScrollView } from 'react-native'
import { Titulo, Descricao, Background, Placeholder, CinzaEscuro, Primary } from "../../Styles"
import GoButton from "../../Components/Buttons/GoButton"
import BackButtonSolid from "../../Components/Buttons/BackButtonSolid"
import { TextInput, Divider, Checkbox  } from 'react-native-paper';
import BouncyCheckbox from "react-native-bouncy-checkbox";

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
	const [Email, setEmail] = useState('')
	const [checkboxState, setCheckboxState] = useState(false);
	const [viewSenha, setViewSenha] = useState(true)
	const [viewConfirmSenha, setViewConfirmSenha] = useState(true)

	const { signIn } = React.useContext(AuthContext)

	const SubscribeHandle = (values) => {
		helpersAuth.Subscribe(values).then(resp => {
			if(resp == true){
				helpersAuth.Login(values.Email, values.confirmPassword).then(response => {
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
      confirmPassword: yup
         .string()
         .oneOf([yup.ref('password')], t('As senhas não conferem'))
         .required(t('Confirme sua senha')),
   })

	return (
		<SafeAreaView style={{flex: 1, backgroundColor: Background}}>
			<ScrollView  contentContainerStyle={{flexGrow: 1}}>
				<ImageBackground 
					source={require("../../Images/Login/bg-subscribe.png")}
					resizeMode="cover"
					style={styles.image}
				>
					<View style={[styles.container, {marginHorizontal: 25, justifyContent: 'center'}]}>
						<BackButtonSolid callback={() => navigation.goBack()}/>
						<Text style={styles.descricao}>
							{t("Se cadastrar é muito fácil")}
						</Text>
					</View>
				</ImageBackground>
				<Formik
	            validationSchema={cadastroValidationSchema}
	           	initialValues={{Nome: '', Email: '', password: '', confirmPassword: ''}}
	            onSubmit={values => SubscribeHandle(values)}
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
						<View style={styles.containerInferior}>
							<TextInput
							   mode='outlined'
							   label={t("Nome")}
							   name="Nome"
							   placeholder={t("Digite seu nome")}
							   placeholderTextColor={Placeholder}
							   outlineColor={values.Nome ? "white" : "transparent"}
							   onChangeText={handleChange('Nome')}
	                     onBlur={handleBlur('Nome')}
	                     value={values.Nome} 
							   style={styles.input}
							   theme={{roundness: 10, colors: { text: 'white', primary: "white", placeholder: Placeholder } }}
						   />
						   <TextInput
							   mode='outlined'
							   label={t("E-mail")}
							   name="Email"
							   autoCapitalize="none"
							   placeholder={t("Digite seu e-mail")}
							   placeholderTextColor={Placeholder}
							   outlineColor={values.Email ? "white" : "transparent"}
							   onChangeText={handleChange('Email')}
	                     onBlur={handleBlur('Email')}
	                     value={values.Email} 
							   style={styles.input}
							   theme={{roundness: 10, colors: { text: 'white', primary: "white", placeholder: Placeholder } }}
						   />
						   <TextInput
							   mode='outlined'
							   name="password"
							   label={t("Senha")}
							   placeholder={t("Digite sua senha")}
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
						   {errors.password &&
	                     <Text style={styles.erros}>{errors.password}</Text>
	                  }
						   <TextInput
							   mode='outlined'
							   name="confirmPassword"
							   label={t("Senha")}
							   placeholder={t("Confirmar senha")}
							   placeholderTextColor={Placeholder}
							   right={
			      				<TextInput.Icon name={viewConfirmSenha ? 'eye-outline' : 'eye-off-outline'} color={Placeholder} onPress={() => setViewConfirmSenha(!viewConfirmSenha)}/>
			      			}
			      			secureTextEntry={viewConfirmSenha}
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

							<View style={{flexDirection: 'row', paddingHorizontal: 20, paddingVertical:10, justifyContent: 'space-between'}}>
						   	<View style={{flex: 1, flexDirection: 'row'}}>
						   		<View>
						   			<BouncyCheckbox
									     	size={20}
											fillColor={Primary}
											unfillColor={Background}
											iconStyle={{ borderColor: Primary }}
									      onPress={() => setCheckboxState(!checkboxState) }
								   	/>
						   		</View>
						   		<Text style={styles.txtPonta}>{t("Eu concordo com os")}<Text style={styles.txtTermos}> {t("termos de uso")}</Text>
						   		</Text>
						   	</View>
						   	<View style={{flex: 1, alignItems: 'flex-end', marginHorizontal: 3}}>
						   		<GoButton width={140} title={t("Cadastrar")} press={handleSubmit} valid={!isValid}/>
						   	</View>
						   </View>
						</View>
				 	</>
	           	)}
	         </Formik>
				<View style={{backgroundColor: Background}}>
					<View style={{height: 2, marginHorizontal: 20, backgroundColor: "#3C3C3C"}} />
				</View>
				<View style={{flex: 2, backgroundColor: Background, justifyContent: "space-evenly"}}>
					<View style={{flexDirection: "row", justifyContent:  "center"}}>
						<Text style={styles.txtPonta}>{t("Ou se")} </Text>
						<Text style={styles.txtMeio}> {t("cadastre")} </Text>
						<Text style={styles.txtPonta}>{("width")}:</Text>
					</View>
					<View style={{flexDirection: "row"}}>
						<TouchableOpacity style={styles.socialButton}>
							<Text style={styles.txtButton}>Google</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.socialButton}>
							<Text style={styles.txtButton}>Facebook</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
  	container: {
    	flex: 1,
  	},
  	descricao: {
      fontFamily: Titulo,
      fontSize: 38,
      color: "white",
      marginTop: 22
   },
  	image: {
    	flex: 4,
  	},
  	containerInferior: {
  		flex:6,
  		backgroundColor: Background, 
  		justifyContent: 'space-around'
  	},
  	input: {
  		color: 'white', 
  		backgroundColor: CinzaEscuro,
      borderRadius: 10, 
      height: 50,
      paddingHorizontal: 20
  	},
  	recSenha: {
  		fontFamily: Descricao, 
  		color: "white", 
  		textDecorationLine: 'underline',
  		fontSize: 14 
  	},
  	txtTermos: {
  		fontFamily: Descricao,
  		fontWeight: 'bold', 
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
  		fontWeight: 'bold',
  		fontSize: 14,
  		color: "white"
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
		fontWeight: 'bold',
		fontSize: 14,
		color: "white",
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
		fontWeight: 'bold',
		fontSize: 14,
		color: "white",
		textDecorationLine: 'underline',
	},
	erros: { 
      fontSize: 12, 
      color: 'red', 
      fontFamily: Descricao,
      paddingHorizontal: 20
   },
   acerto: {
   	fontSize: 12, 
      color: '#8AF470', 
      fontFamily: Descricao,
      paddingHorizontal: 20
   }
})

export default index