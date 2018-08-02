import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/page-header';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LineMarkSeries } from 'react-vis';

import '../styles/ChartView.css';
import '../../node_modules/react-vis/dist/style.css';

export default class ChartView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            width: 0,
            height: 0,
            stories: [],
            data: []
        };
        this.extractData = this.extractData.bind(this);
        this.setSessionStorage = this.setSessionStorage.bind(this);
    }

    componentDidMount() {
        const width = this.divElement.clientWidth;
        const height = this.divElement.clientHeight;
        const { stories } = this.props.location.state;
        this.setState({ width, height, stories });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.stories !== this.state.stories) {
            this.extractData(this.state.stories);
        }

    }

    extractData(array) {
        let data = array.map((story, index) => {
            const x = index;
            const y = story.score;
            return { x, y };
        });
        this.setState({ data });
    }

    setSessionStorage(val) {
        sessionStorage.setItem('initiated', val);
    }

    render() {
        return (
            <div className='main-container'>
                <PageHeader />
                <div className='chart-container'
                    ref={(divElement) => this.divElement = divElement}
                    style={{ width: '70%', marginLeft: '15%', marginRight: '15%', height: '70vh', marginTop: '5vh' }}>
                    <XYPlot
                        width={this.state.width}
                        height={this.state.height}
                    >
                        <VerticalGridLines tickTotal={10} style={{ opacity: '0.2' }} />
                        <HorizontalGridLines tickTotal={10} style={{ opacity: '0.2' }} />
                        <XAxis tickTotal={10} title='story' />
                        <YAxis tickTotal={10} title='score' />
                        <LineMarkSeries
                            className='linemark-series-example-2'
                            curve={'curveMonotoneX'}
                            data={this.state.data}
                        />
                    </XYPlot>

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
            </div>
        );
    }
}