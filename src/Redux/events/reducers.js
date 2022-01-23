import { REQUEST_EVENTS, REQUEST_EVENTS_SUCCESS } from './constants';

const INIT_STATE = {
	events : [],
   loading: false,
   error: false
};

const Events = (state = INIT_STATE, action) => {
   console.log(action)
   switch (action.type) {
      case REQUEST_EVENTS:
         return { ...state, loading: true, error: false};

      case REQUEST_EVENTS_SUCCESS:
         return { ...state, loading: false, error: false, events: action.payload};  
                         
      default: return { ...state };
   }
}

export default Events;