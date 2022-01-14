import api from "../Api";
import AsyncStorage from '@react-native-async-storage/async-storage';

class HelpersInterests {

	async GetInterests(){
		try{
			const Interesses = await api.get('/interests', { 
				headers: {
	            'Content-Type': 'application/json'
	        	}
			})
			return Interesses
		} catch (err) {
			const error = err.response.data
			return error
		}
	}
	
}

export { HelpersInterests };

