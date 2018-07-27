import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTopStories } from '../actions/stories';
import StoryTable from './story-table';

import '../styles/MainView.css';

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            initialMounted: false
        }
    }

    componentDidMount() {
        const val = sessionStorage.getItem('initiated');
        if (val === null) {
            this.props.fetchTopStories();
        }
    }

    render() {
        return (
            <div className='mainpage-main-container'>
                <header className='mainpage-header'>
                    <h1 className='mainpage-title'>TOP STORIES </h1>
                </header>
                <p className='mainpage-description'>
                    This is a list with 10 randomly selected top stories from Hacker News Api
                </p>
                <StoryTable />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        stories: state.stories,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTopStories: () => dispatch(fetchTopStories()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);

