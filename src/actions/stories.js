import axios from 'axios';
import convertTime from '../functions/convert-time';

export const STORIES_HAVE_ERROR = 'STORIES_HAVE_ERROR';
export const STORIES_ARE_LOADING = 'STORIES_ARE_LOADING';
export const STORIES_FETCH_DATA_SUCCESS = 'STORIES_FETCH_DATA_SUCCESS';
export const TOP_STORIES_FETCH_DATA_SUCCESS = 'TOP_STORIES_FETCH_DATA_SUCCESS';

export function storiesHaveError(bool) {
    return {
        type: STORIES_HAVE_ERROR,
        hasError: bool
    };
}

export function storiesAreLoading(bool) {
    return {
        type: STORIES_ARE_LOADING,
        isLoading: bool
    };
}

export function storiesFetchDataSuccess(stories) {
    return {
        type: STORIES_FETCH_DATA_SUCCESS,
        payload: stories
    };
}

export function fetchDataTopStoriesSuccess(selectedStories) {
    return {
        type: TOP_STORIES_FETCH_DATA_SUCCESS,
        payload: selectedStories
    };
}

export function fetchTopStories() {
    const url = 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty';
    return (dispatch) => {
        dispatch(storiesAreLoading(true));
        axios.get(url)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                dispatch(storiesAreLoading(false));
                return response;
            })
            .then((response) => dispatch(storiesFetchDataSuccess(response.data)))
            .catch(() => dispatch(storiesHaveError(true)));
    };
}

export function fetchDataTopStories(stories) {
    let rootUrl = 'https://hacker-news.firebaseio.com/v0/';
    let selectedStories = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}];

    return (dispatch) => {
        dispatch(storiesAreLoading(true));

        selectedStories.forEach((story) => {
            let ramdomStory = stories[Math.floor(Math.random() * stories.length)];
            let fullStoryUrl = `${rootUrl}item/${ramdomStory}.json?print=pretty`;
            axios.get(fullStoryUrl)
                .then((response) => {
                    if (response.status !== 200) {
                        throw Error(response.statusText);
                    }
                    return response;
                })
                .then((response) => {
                    story.id = response.data.id;
                    story.url = response.data.url;
                    story.title = response.data.title;
                    story.score = response.data.score;
                    story.author = response.data.by;
                    story.time = convertTime(response.data.time);
                    let fullAuthorUrl = `${rootUrl}user/${response.data.by}.json?print=pretty`;
                    axios.get(fullAuthorUrl).then((response) => {
                        story.karma = response.data.karma;
                    })
                })
                .catch(() => dispatch(storiesHaveError(true)));


        });

        setTimeout(() => {
            dispatch(fetchDataTopStoriesSuccess(selectedStories));
            dispatch(storiesAreLoading(false));
        }, 3000);
    };
}
