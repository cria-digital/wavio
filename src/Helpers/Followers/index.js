import api from "../Api";

class HelpersFollowers {

	async Following(id, target){
		try{
			const following = await api.post('/users/following', {
				 	"username": id,
  					"target": target
			}, { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return following
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

	async GetFollowing(id){
		try{
			const seguindo = await api.get('/users/following/'+id, { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return seguindo
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

	async GetFollowers(id){
		try{
			const seguidores = await api.get('/users/followers/'+id, { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return seguidores
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

	async Unfollow(id){
		try{
			const unfollow = await api.delete('/users/following/'+id, { 
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

export { HelpersFollowers };
