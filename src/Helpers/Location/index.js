import { API_KEY, api_location } from "./Apikey";

class HelpersLocation {

	async SourcePlaces(place){
		try{
			const places = await api_location.get('/autocomplete/json?input='+place+'&language=pt_BR&key='+API_KEY, { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return places
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

	async DetailsPlaces(placeId){
		try{
			const details = await api_location.get('/details/json?place_id='+placeId+'&key='+API_KEY, { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return details
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

}

export { HelpersLocation };

