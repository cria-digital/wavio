import api from '../Api';
import {Platform} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

class HelpersHangouts {
	async GetListHangout() {
		try {
			const users = await api.get('/hangouts/users', {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return users;
		} catch (err) {
			const error = err.response.data;
			return error;
		}
	}

	async LikeOrDeslike(user, direction) {
		try {
			const users = await api.post('/hangouts', {
					user: user,
					direction: direction
				}, {
				headers: {
					'Content-Type': 'application/json'
				}
			});
			return users;
		} catch (err) {
			const error = err.response.data;
			return error;
		}
	}
}

export { HelpersHangouts };
