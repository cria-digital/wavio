import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Chat from './chat/reducers';
import Tabs from './tabs/reducers';

export default combineReducers({
    Auth,
    Chat,
    Tabs
});