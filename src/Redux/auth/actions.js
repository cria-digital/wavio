import { RETRIVE_USER, RETRIVE_USER_SUCESS } from './constants';


export const retrive_user = (userId) => ({
   type: RETRIVE_USER
});

export const retrive_user_sucess = (user) => ({
   type: RETRIVE_USER_SUCESS,
   payload : user  
});

