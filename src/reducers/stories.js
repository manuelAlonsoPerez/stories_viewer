import {
    STORIES_HAVE_ERROR,
    STORIES_ARE_LOADING,
    STORIES_FETCH_DATA_SUCCESS,
    TOP_STORIES_FETCH_DATA_SUCCESS
} from '../actions/stories';

export function storiesHaveError(state = false, action) {
    switch (action.type) {
        case STORIES_HAVE_ERROR:
            return action.hasError;
        default:
            return state;
    }
}

export function storiesAreLoading(state = false, action) {
    switch (action.type) {
        case STORIES_ARE_LOADING:
            return action.isLoading;
        default:
            return state;
    }
}

export function stories(state = [], action) {
    switch (action.type) {
        case STORIES_FETCH_DATA_SUCCESS:
            return [...action.payload];
        default:
            return state;
    }
}

export function topStories(state = [], action) {
    switch (action.type) {
        case TOP_STORIES_FETCH_DATA_SUCCESS:
            return [...action.payload];
        default:
            return state;
    }
}

