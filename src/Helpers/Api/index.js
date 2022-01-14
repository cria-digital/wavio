import axios from "axios";

import moment from 'moment'; 

import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  	baseURL: "https://wavio-api-2bd7wtnamq-uc.a.run.app" 
});


api.interceptors.request.use(async (config) => {
  	if (
    	(config.url.endsWith('authorize') ||
    	config.url.endsWith('signup')) == false
  	) {
    	const userTokenExpiration = await AsyncStorage.getItem('userTokenExpiration');
    	var today = moment().format();
    	if (today > userTokenExpiration) {
         const value = await AsyncStorage.getItem('credenciais')
         const obj = JSON.parse(value);
      	const result = await api.post('/authorize', 
            {
               email: obj.email,
               password: obj.senha   
            }, { 
            headers: {
               'Content-Type': 'application/json',
            }
         })
         const userToken = String(result.data.token);
         const userTokenExpiration = moment().add(1, 'days').format();
         await AsyncStorage.setItem('userToken', userToken);
         await AsyncStorage.setItem('userTokenExpiration', userTokenExpiration);
         config.headers.Authorization = `Bearer ${userToken}`;
    	} else {
      	const userToken = await AsyncStorage.getItem('userToken');
      	config.headers.Authorization = `Bearer ${userToken}`;
    	}
  	}

  	return config;
}, (error) => {
  // I cand handle a request with errors here
  return Promise.reject(JSON.stringify(error));
});


export default api;