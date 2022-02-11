import { RETRIVE_USER, RETRIVE_USER_SUCESS, RETRIVE_TOKEN, RETRIVE_TOKEN_SUCESS } from './constants';


export const retrive_user = () => ({
   type: RETRIVE_USER
});

export const retrive_user_sucess = (user) => ({
   type: RETRIVE_USER_SUCESS,
   payload : user  
});

export const retrive_token = () => ({
   type: RETRIVE_TOKEN,
});

export const retrive_token_sucess = (token) => ({
   type: RETRIVE_TOKEN_SUCESS,
   payload : token  
});
