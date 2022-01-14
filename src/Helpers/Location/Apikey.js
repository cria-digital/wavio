import axios from "axios";

export const API_KEY = 'AIzaSyDKOhnmr9hGE4V82hmLuls_1bDxzK-xpA0'

export const api_location = axios.create({
  	baseURL: "https://maps.googleapis.com/maps/api/place" 
});