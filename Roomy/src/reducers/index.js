import { combineReducers } from 'redux';
import userReducer from './userReducer';
import articleReducer from './articleReducer';
import rentalReducer from './rentalReducer';
import roommateReducer from './roommateReducer';
import otherUserReducer from './otherUserReducer';
import activeTabReducer from './activeTabReducer';

const rootReducer = combineReducers({
    userState: userReducer,
    articleState: articleReducer,
    rentalState: rentalReducer,
    roommateState: roommateReducer,
    otherUserState: otherUserReducer,
    activeTabState: activeTabReducer,
});

export default rootReducer;
