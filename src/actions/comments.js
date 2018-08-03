import axios from 'axios';
import convertTime from '../functions/convert-time';

export const COMMENTS_HAVE_ERROR = 'COMMENTS_HAVE_ERROR';
export const COMMENTS_ARE_LOADING = 'COMMENTS_ARE_LOADING';
export const COMMENTS_FETCH_DATA_SUCCESS = 'COMMENTS_FETCH_DATA_SUCCESS';
export const COMMENTS_FETCH_FULL_DATA_SUCCESS = 'COMMENTS_FETCH_FULL_DATA_SUCCESS';

export function commentsHaveError(bool) {
    return {
        type: COMMENTS_HAVE_ERROR,
        hasError: bool
    };
}

export function commentsAreLoading(bool) {
    return {
        type: COMMENTS_ARE_LOADING,
        isLoading: bool
    };
}

export function commentsFetchDataSuccess(comments) {
    return {
        type: COMMENTS_FETCH_DATA_SUCCESS,
        payload: comments
    };
}

export function commentsFetchFullDataSuccess(fullComments) {
    return {
        type: COMMENTS_FETCH_FULL_DATA_SUCCESS,
        payload: fullComments
    };
}

export function fetchFirstComments(id) {
    let rootUrl = 'https://hacker-news.firebaseio.com/v0/';
    let fullUrl = `${rootUrl}item/${id}.json?print=pretty`;
    let firstComments = [];

    return (dispatch) => {
        dispatch(commentsAreLoading(true));

        axios.get(fullUrl)
            .then((response) => {
                if (response.status !== 200) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => {
                firstComments = response.data.kids;
                if (firstComments.length > 10) {
                    firstComments = firstComments.slice(0, 10);
                }
                dispatch(commentsFetchDataSuccess(firstComments));
            })
            .catch(() => dispatch(commentsHaveError(true)));
    };
}

export function fetchDataComments(comments) {
    let rootUrl = 'https://hacker-news.firebaseio.com/v0/';
    let commentsData = [];

    return (dispatch) => {
        dispatch(commentsAreLoading(true));

        comments.map((comment, index) => {
            let id = comment;
            let fullCommentUrl = `${rootUrl}item/${id}.json?print=pretty`;
            axios.get(fullCommentUrl)
                .then((response) => {
                    if (response.status !== 200) {
                        throw Error(response.statusText);
                    }
                    return response;
                })
                .then((response) => {
                    let id = response.data.id;
                    let text = response.data.text;
                    let date = convertTime(response.data.time);
                    let author = response.data.by;
                    let fullAuthorUrl = `${rootUrl}user/${author}.json?print=pretty`;
                    axios.get(fullAuthorUrl)
                        .then((response) => {
                            let authorComments = response.data.submitted.length;
                            return authorComments;
                        }).then((authorComments) => {
                            commentsData.push({ id, text, date, author, authorComments });
                        })
                })
                .catch(() => dispatch(commentsHaveError(true)));
            return comment;
        });

        setTimeout(() => {
            dispatch(commentsFetchFullDataSuccess(commentsData));
            dispatch(commentsAreLoading(false));
        }, 3000);
    }
}

