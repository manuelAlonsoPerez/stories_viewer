import {
    COMMENTS_HAVE_ERROR,
    COMMENTS_ARE_LOADING,
    COMMENTS_FETCH_DATA_SUCCESS,
    COMMENTS_FETCH_FULL_DATA_SUCCESS
} from '../actions/comments';

export function commentsHaveError(state = false, action) {
    switch (action.type) {
        case COMMENTS_HAVE_ERROR:
            return action.hasError;
        default:
            return state;
    }
}

export function commentsAreLoading(state = false, action) {
    switch (action.type) {
        case COMMENTS_ARE_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

export function comments(state = [], action) {
    switch (action.type) {
        case COMMENTS_FETCH_DATA_SUCCESS:
            return [...action.payload];
        default:
            return state;
    }
}

export function fullComments(state = [], action) {
    switch (action.type) {
        case COMMENTS_FETCH_FULL_DATA_SUCCESS:
            return [...action.payload];
        default:
            return state;
    }
}