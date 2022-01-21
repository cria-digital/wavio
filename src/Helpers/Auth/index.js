import api from "../Api";

import AsyncStorage from '@react-native-async-storage/async-storage';

class HelpersAuth {

	async Subscribe(values){
		try{
			const user = await api.post('/signup', {
				name: values.Nome,
  				email: values.Email,
  				password: values.confirmPassword
			}, { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return true
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

	async Login(Email, Senha){
		try{
			const user = await api.post('/authorize', {
				email: Email,
				password: Senha	
			}, { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			if(user){
				const credenciais = {email: Email, senha: Senha} 
				const jsonValue = JSON.stringify(credenciais)    
				await AsyncStorage.setItem('credenciais', jsonValue)
			}
			return user
		} catch (err) {
			console.log(err)
			const error = err.response.data
			return error
		}
	}

}

export { HelpersAuth };

