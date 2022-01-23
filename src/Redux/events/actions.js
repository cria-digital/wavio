import { REQUEST_EVENTS, REQUEST_EVENTS_SUCCESS} from './constants';


export const requestEvents = () => ({
    type: REQUEST_EVENTS
});

export const requestEventsSuccess = (events) => ({
    type: REQUEST_EVENTS_SUCCESS,
    payload : events
});



