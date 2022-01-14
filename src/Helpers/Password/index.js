import api from "../Api";
import AsyncStorage from '@react-native-async-storage/async-storage';

class HelpersPassword {

	async sendCode(email){
		try{
			const codeSend = await api.post('/forgot-password', {
				email: email
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

	async validateCode(email, code){
		try{
			const codeSend = await api.post('/validate-code', {
				email: email,
				code: code
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

	async sendNewPassword(values){
		try{
			const newPassword = await api.post('/change-password', {
				email: values.email,
				password: values.password,
				code: values.code
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

	async changePassword(values){
		try{
			const newPassword = await api.put('/users/'+values.id+'/change-password', {
				password: values.password,
  				new_password: values.new_password
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

}

export { HelpersPassword };

