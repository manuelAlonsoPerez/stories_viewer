import { combineReducers } from 'redux';
import { storiesHaveError, storiesAreLoading, stories, topStories } from './stories';

export default combineReducers({
    storiesHaveError,
    storiesAreLoading,
    stories,
    topStories
});

