import api from '../Api';
import {Platform} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

class HelpersUser {

	async GetToken() {
		try {
			userToken = await AsyncStorage.getItem('userToken'); 
			return userToken
		} catch (err) {
			const error = err.response.data;
			return error;
		}
	}


	async GetAllUsers() {
		try {
			const users = await api.get('/users', {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const userInformation = users.data;
			return userInformation;
		} catch (err) {
			const error = err.response.data;
			return error;
		}
	}

	async GetUser() {
		try {
			const userId = await AsyncStorage.getItem('userId');
			const userInfor = await api.get('/users/' + userId, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const userInformation = userInfor.data;
			return userInformation;
		} catch (err) {
			const error = err.response.data;
			return error;
		}
	}

	async GetUserDinamic(id) {
		try {
			const userInfor = await api.get('/users/' + id, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const userInformation = userInfor.data;
			return userInformation;
		} catch (err) {
			const error = err.response.data;
			return error;
		}
	}

	async ModifydUser(userModified) {
		try {
			const Interesses = await api.put(
				'/users/' + userModified.id,
				userModified,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				},
			);
			return true;
		} catch (err) {
			const error = err.response.data;
			return error;
		}
	}

	async SendPhotos(value) {
		try {
			console.log(value);
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			let fd = new FormData();

			fd.append('user', value.user);
			fd.append('profile', value.profile);
			fd.append('image', {
				uri: value.sourceURL,
				type: value.mime,
				name: new Date().toString(),
			});

			const userWithFotos = await api.post('/user-photo', fd, config);
			return true;
		} catch (err) {
			console.log(err);
			const error = err.response.data;
			return false;
		}
	}

	async DeletePhoto(photo) {
		try {
			const Interesses = await api.delete('/user-photo/' + photo, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return true;
		} catch (err) {
			const error = err.response.data;
			return false;
		}
	}

	async ChangePhotoProfile(photo) {
		try {
			console.log('centro' + photo);
			const Interesses = await api.get('/user-photo/change-profile/' + photo, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return true;
		} catch (err) {
			const error = err.response.data;
			return false;
		}
	}
}

export {HelpersUser};
