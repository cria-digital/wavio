import { TOGGLE_TAB } from './constants';

const INIT_STATE = {
    active_tab: 'Home'
};

const Tabs = (state = INIT_STATE, action) => {
    switch (action.type) {
        case TOGGLE_TAB:
            return { ...state, active_tab: action.payload }

        default: return { ...state };
    }
}

export default Tabs;