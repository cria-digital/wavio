import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Events from './events/reducers';
import Tabs from './tabs/reducers';

export default combineReducers({
    Auth,
    Events,
    Tabs
});