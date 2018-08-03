import axios from 'axios';
import convertTime from '../functions/convert-time';

export default function getStory(fullStoryUrl) {
    let story;
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

    return story;
}