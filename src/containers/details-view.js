import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/page-header';

import '../styles/DetailsView.css';

export default class DetailsView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            story: null,
        };
        this.setSessionStorage = this.setSessionStorage.bind(this);
    }

    componentDidMount() {
        const { story } = this.props.location.state;
        this.setState({ story });
    }

    setSessionStorage(val) {
        sessionStorage.setItem('initiated', val);
    }

    render() {
        console.log(this.state.story);
        return (
            <div className='main-container'>
                <PageHeader />

                <Link
                    className='chart-buttons-container'
                    to='/'
                    onClick={() => this.setSessionStorage(true)}
                >
                    <button className='button-back'>
                        Back
                    </button>
                </Link>

            </div>
        );
    }
}