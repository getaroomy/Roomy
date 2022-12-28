import { SET_ACTIVE_TAB } from '../action/actionType';

const INITIAL_STATE = {
    activeTab: null,
};

const activeTabReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case SET_ACTIVE_TAB:
        return {
            ...state,
            activeTab: action.activeTab,
        };
    default:
        return state;
    }
};

export default activeTabReducer;
