import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTopStories } from '../actions/stories';
import PageHeader from '../components/page-header';
import StoriesTable from './stories-table';

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
                <PageHeader />
                <p className='mainpage-description'>
                    This is a list with 10 randomly selected top stories from Hacker News Api
                </p>
                <StoriesTable />
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

