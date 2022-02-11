import {
   RETRIVE_USER,
   RETRIVE_USER_SUCESS,
   RETRIVE_TOKEN, 
   RETRIVE_TOKEN_SUCESS
} from './constants';

const INIT_STATE = {
   user: [],
   initializing: true,
   token: ""
};


const Auth = (state = INIT_STATE, action) => {
   switch (action.type) {
      case RETRIVE_USER:
         return { ...state };

      case RETRIVE_USER_SUCESS:
         return { ...state, initializing: false, user: action.payload };

      case RETRIVE_TOKEN:
         return { ...state};

      case RETRIVE_TOKEN_SUCESS:
         return { ...state, token: action.payload };
        
      default: return { ...state };
   }
}

export default Auth;