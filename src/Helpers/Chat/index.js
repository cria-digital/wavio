import api from "../Api";

class HelpersChat {

	async GetChats(){
		try{
			const chats = await api.get('/chats', { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return chats
		} catch (err) {
			//const error = err.response.data
			return false
		}
	}

	async GetMessageChat(chat_id){
		try{
			const menssages = await api.get('/chats/'+chat_id+'/messages', { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return menssages
		} catch (err) {
			//const error = err.response.data
			return false
		}
	}

	async CreateChat(userId, send_id){
		try{
			const chat = await api.post('/chats', { 
				"members": 
					[	
						send_id,
						userId
					]
			}, {
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return chat
		} catch (err) {
			//const error = err.response.data
			return false
		}
	}

	async CreateChatEvent(event){
		try{
			const chat = await api.post('/chats', { 
				"event": event
			}, {
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return chat
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

}

export { HelpersChat };

