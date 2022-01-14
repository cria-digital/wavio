import {
   RETRIVE_USER,
   RETRIVE_USER_SUCESS
} from './constants';

const INIT_STATE = {
   user: [],
   initializing: true
};


const Auth = (state = INIT_STATE, action) => {
   switch (action.type) {
      case RETRIVE_USER:
         return { ...state };
      case RETRIVE_USER_SUCESS:
         return { ...state, initializing: false, user: action.payload };
        
      default: return { ...state };
   }
}

export default Auth;