import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import configureStore from './store/configureStore';
import Chart from './containers/chart-view';
import MainView from './containers/main-view';
import registerServiceWorker from './registerServiceWorker';

import './styles/Index.css';

WebFont.load({
    google: {
        families:
            ['Varela Round:400',
                'Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic',
                'Changa One:400,400italic', 'Exo:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic']
    }
});

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route path='/chart' component={Chart} />
                <Route path='/' component={MainView} />
            </Switch>
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
