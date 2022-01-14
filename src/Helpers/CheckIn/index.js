import api from "../Api";

class HelpersCheckIn {

	async CheckIn(values){
		try{
			const user = await api.post('/event-checkins', {
				event: values.idEvent,
  				user: values.idUser
			}, { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return true
		} catch (err) {
			const error = err.response.data
			return false
		}
	}

	async CheckInMe(values){
		try{
			const checkIns = await api.get('/event-checkins/me', { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return checkIns
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

	async CancelCheckInMe(id){
		try{
			const checkInsCancel = await api.delete('/event-checkins/'+id, { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return true
		} catch (err) {
			const error = err.response.data
			return false
		}
	}

}

export { HelpersCheckIn };

