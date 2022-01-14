import api from "../Api";

class HelpersEvents {

	async GetEvents(){
		try{
			const eventos = await api.get('/events', { 
				headers: {
	            'Content-Type': 'application/json'
	        	}
			})
			return eventos
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

	async GetEventId(idEvent){
		try{
			const eventos = await api.get('/events/'+idEvent, { 
				headers: {
	            'Content-Type': 'application/json'
	        	}
			})
			return eventos
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

	async GetEvent(category){
		try{
			const eventos = await api.get('/events', { 
				headers: {
	            'Content-Type': 'application/json',
	            'category': category
	        	}
			})
			return eventos
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

	async GetMyEvents(idUser){
		try{
			const eventos = await api.get('/events', { 
				headers: {
	            'Content-Type': 'application/json',
	            'author': idUser
	        	}
			})
			return eventos
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

	async GetMyEventsChekin(){
		try{
			const eventos = await api.get('/event-checkins/me', { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return eventos
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

	async GetChekinByEvent(idEvent){
		try{
			const peoples = await api.get('/event-checkins/byevent/'+idEvent, { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return peoples
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

	async SendPhotos(value) {
		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			let fd = new FormData();

			fd.append('event', value.event);
			fd.append('banner', value.banner);
			fd.append('image', {
				uri: value.sourceURL,
				type: value.mime,
				name: new Date().toString(),
			});

			const userWithFotos = await api.post('/event-photo', fd, config);
			return true;
		} catch (err) {
			console.log(err);
			const error = err.response.data;
			return false;
		}
	}

	async SaveEvent(values){
		try{
			const eventos = await api.post('/events', { 
				headers: {
	            'Content-Type': 'application/json'
	        	}, 
	        	title: values.title,
				date: values.date,
				hour: values.hour,
				about: values.about,
				location: values.location,
				location_name: values.location_name,
				category: values.category,
				author: values.author
			})
			return eventos.data
		} catch (err) {
			const error = err.response.data
			return error
		}
	}

	async EditEvent(values){
		try{
			const eventos = await api.put('/events/'+values.id, { 
				headers: {
	            'Content-Type': 'application/json'
	        	}, 
	        	_id: values._id,
				title: values.title,
				date: values.date,
				hour: values.hour,
				about: values.about,
				location: values.location,
				location_name: values.location_name,
				category: values.category,
				author: values.author,
				__v: values.__v,
				id: values.id
			})
			return true
		} catch (err) {
			const error = err.response.data
			console.log(error)
			return error
		}
	}

	async ChangePhotoEvent(event_id, photo_id){
		try{
			const eventos = await api.get('/event-photo/'+event_id+'/change-banner/'+photo_id, { 
				headers: {
	            'Content-Type': 'application/json',
	        	}
			})
			return eventos
		} catch (err) {
			const error = err.response.data
			return error
		}
	}
	
}

export { HelpersEvents };