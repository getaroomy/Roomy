import { SET_LOADING_STATUS, GET_ARTICLES, GET_SINGLE_ARTICLE } from '../action/actionType';

export const initialState = {
    loading: false,
    articles: [],
    ids: []
};

function articleReducer(state = initialState, action) {
    switch (action.type) {
    case GET_ARTICLES:
        return {
            ...state,
            articles: [...state.articles, ...action.payload],
            ids: [...state.ids, ...action.id],
        };
    case GET_SINGLE_ARTICLE:
        return {
            ...state,
            articles: action.payload,
            ids: action.id,
        };
    case SET_LOADING_STATUS:
        return {
            ...state,
            loading: action.status,
        };
    default:
        return state;
    }
}

export default articleReducer;
