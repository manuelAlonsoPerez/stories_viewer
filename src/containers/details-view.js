import React, { Component } from 'react';
import { connect } from 'react-redux';
import Parser from 'html-react-parser';
import { Link } from 'react-router-dom';
import { fetchFirstComments, fetchDataComments } from '../actions/comments';
import loading_icon from '../assets/loading.webp';
import PageHeader from '../components/page-header';

import '../styles/DetailsView.css';

class DetailsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            story: null,
        };
        this.renderComments = this.renderComments.bind(this);
        this.setSessionStorage = this.setSessionStorage.bind(this);
    }

    componentDidMount() {
        const { story } = this.props.location.state;
        this.setState({ story });
        this.props.fetchFirstComments(story.id);

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.comments !== this.props.comments && this.props.comments) {
            this.props.fetchDataComments(this.props.comments);
        }
    }


    setSessionStorage(val) {
        sessionStorage.setItem('initiated', val);
    }

    renderComments() {
        if (this.props.hasError) {
            return (
                <p className='error-text'>Sorry!!! There was an error loading the items</p>
            )
        }
        if (this.props.isLoading) {
            return (
                <div className='loading-main-container'>
                    <p className='loading-text'>Loading Comments…</p>
                    <img src={loading_icon} alt='loading' className='loading-icon' width='85px' height='85px' />
                </div>
            )
        }
        return (
            this.props.fullComments.map((fullComment) => {
                const html = `<div>${fullComment.text}</div>`;
                return (
                    <div className='comment-main-container'>
                        <div className='comment-headings'>
                            <div className='comment-heading-box'>
                                <div className='comment-heading' >By:</div>
                                <div className='comment-heading-content'>{fullComment.author}</div>
                            </div>
                            <div className='comment-heading-box'>
                                <div className='comment-heading' >Author comments:</div >
                                <div className='comment-heading-content' >{fullComment.authorComments}</div>
                            </div>
                            <div className='comment-heading-box'>
                                <div className='comment-heading' >Created:</div >
                                <div className='comment-heading-content' >{fullComment.date} </div>
                            </div>
                        </div>
                        <div className='comment-heading' >Comment:</div>
                        <div className='comment-content' >
                            {Parser(html)}
                        </div>
                    </div>
                );
            })
        );
    }

    render() {

        const story = this.state.story;
        // console.log(this.state.story);

        if (story !== null) {
            return (
                <div className='main-container'>
                    <PageHeader />

                    <div className='main-story-container'>
                        <div className='story-line'>
                            <div className='story-cell'>Title:
                                <div className='story-cell-content'>{story.title}</div>
                            </div>
                            <div className='story-cell'>Date:
                                <div className='story-cell-content'>{story.time}</div>
                            </div>

                        </div>
                        <div className='story-line'>
                            <div className='story-cell'>Author:
                                <div className='story-cell-content'>{story.author}</div>
                            </div>
                            <div className='story-cell'>Author's Karma:
                                <div className='story-cell-content'>{story.karma}</div>
                            </div>
                        </div>
                        <div className='story-line'>
                            <div className='story-cell'>Score:
                                <div className='story-cell-content'>{story.score}</div>
                            </div>

                            <div className='story-cell'>Link:
                                <a href={story.url} target="_blank" className='story-cell-content'>url</a>
                            </div>
                        </div>
                        <div className='comments-main-container'>
                            <div className='comments-title'> Comments: </div>
                            {this.renderComments()}
                        </div>
                    </div>

                    <Link
                        className='details-buttons-container'
                        to='/'
                        onClick={() => this.setSessionStorage(true)}
                    >
                        <button className='button-back'>
                            &#60;
                            Back to stories
                        </button>
                    </Link>
                </div >
            );
        }
        return (
            <div></div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments,
        fullComments: state.fullComments,
        hasError: state.commentsHaveError,
        isLoading: state.commentsAreLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchFirstComments: (id) => dispatch(fetchFirstComments(id)),
        fetchDataComments: (comments) => dispatch(fetchDataComments(comments))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsView);