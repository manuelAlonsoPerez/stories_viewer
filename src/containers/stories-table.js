import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDataTopStories } from '../actions/stories';
import { Link } from 'react-router-dom';
import loading_icon from '../assets/loading.webp';

import '../styles/StoriesTable.css';

class StoriesTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            storiesToShow: this.props.stories,
            orderedStories: []
        }
        this.bubbleSort = this.bubbleSort.bind(this);
        this.renderStories = this.renderStories.bind(this);
    }

    componentDidMount() {
        let orderedStories = sessionStorage.getItem('orderedStories');
        let unorderedStories = sessionStorage.getItem('unorderedStories');

        if (orderedStories !== null) {
            let recordedOrderedStories = JSON.parse(orderedStories);
            let recordedUnorderedStories = JSON.parse(unorderedStories);
            this.setState({
                isLoading: false,
                storiesToShow: recordedUnorderedStories,
                orderedStories: recordedOrderedStories
            });
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.stories !== this.props.stories && this.props.stories) {
            this.props.fetchDataTopStories(this.props.stories);
        }

        if (prevProps.selectedStories !== this.props.selectedStories && this.props.selectedStories) {
            this.setState({ storiesToShow: this.props.selectedStories });
        }
        if (prevState.storiesToShow !== this.state.storiesToShow) {
            let unorderedStories = this.state.storiesToShow.slice(0);
            let orderedStories = this.bubbleSort(unorderedStories);
            sessionStorage.setItem('unorderedStories', JSON.stringify(this.state.storiesToShow));
            sessionStorage.setItem('orderedStories', JSON.stringify(orderedStories));
            this.setState({ orderedStories });
        }
    }

    bubbleSort(unsortedArray) {
        let swapp;
        let n = unsortedArray.length - 1;
        let x = unsortedArray;
        do {
            swapp = false;
            for (let i = 0; i < n; i++) {
                if (x[i].score < x[i + 1].score) {
                    let temp = x[i];
                    x[i] = x[i + 1];
                    x[i + 1] = temp;
                    swapp = true;
                }
            }
            n--;
        } while (swapp);
        return x;
    }

    renderStories() {
        let stories = this.state.orderedStories;

        return (
            stories.map((story) => {
                return (
                    <tr key={story.id}>
                        <td className='table-story-cell table-story-cell-name'>{story.title}</td>
                        <td className='table-story-cell'>{story.score}</td>
                        <td className='table-story-cell'>{story.author}</td>
                        <td className='table-story-cell'>{story.karma}</td>
                        <td className='table-story-cell'>{story.time}</td>
                        <td className='table-story-cell'>
                            <Link
                                className='main-buttons-container'
                                to={{
                                    pathname: '/details',
                                    state: {
                                        story: story
                                    }
                                }}
                            >
                                <button className='button button-details'>
                                    details
                                    <i className='right-arrow'>&#62;</i>
                                </button>
                            </Link>

                        </td>
                    </tr >
                );
            })
        );
    }

    render() {
        if (this.props.hasError) {
            return (
                <p className='error-text'>Sorry!!! There was an error loading the items</p>
            )
        }
        if (this.props.isLoading) {
            return (
                <div>
                    <img src={loading_icon} alt='loading' width='85px' height='85px' />
                    <p className='loading-text'>Loading…</p>
                </div>
            )
        }
        return (
            <div className='stories-main-container'>
                <table className='table-container' cellSpacing='0'>
                    <thead className='table-header'>
                        <tr>
                            <th className='header-cell'>Title</th>
                            <th className='header-cell'>Score</th>
                            <th className='header-cell'>Author</th>
                            <th className='header-cell'>Author´s Karma</th>
                            <th className='header-cell'>Date</th>
                            <th className='header-cell'>Go to</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderStories()}
                    </tbody>
                </table>
                <Link
                    className='main-buttons-container'
                    to={{
                        pathname: '/chart',
                        state: {
                            stories: this.state.storiesToShow
                        }
                    }}
                >
                    <button className='button button-chart'>
                        Show chart
                    </button>
                </Link>
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stories: state.stories,
        selectedStories: state.topStories,
        hasError: state.storiesHaveError,
        isLoading: state.storiesAreLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDataTopStories: (stories) => dispatch(fetchDataTopStories(stories)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoriesTable);