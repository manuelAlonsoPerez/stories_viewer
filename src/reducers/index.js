import { combineReducers } from 'redux';
import { storiesHaveError, storiesAreLoading, stories, topStories } from './stories';
import { commentsHaveError, commentsAreLoading, comments, fullComments } from './comments';

export default combineReducers({
    storiesHaveError,
    storiesAreLoading,
    stories,
    topStories,
    commentsHaveError,
    commentsAreLoading,
    comments,
    fullComments
});

