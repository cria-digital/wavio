import api from "../Api";

class HelpersPlans {

	async GetPlans(){
		try{
			const planos = await api.get('/plans', { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return planos
		} catch (err) {
			const error = err.response.data
			return error
		}
	}
}

export { HelpersPlans };