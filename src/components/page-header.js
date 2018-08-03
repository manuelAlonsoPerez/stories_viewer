import React, { Component } from 'react';

import '../styles/PageHeader.css';

export default class PageHeader extends Component {
    render() {
        return (
            <div className='mainpage-main-container'>
                <header className='mainpage-header'>
                    <h1 className='mainpage-title'>TOP STORIES </h1>
                </header>
            </div>
        );
    }
}