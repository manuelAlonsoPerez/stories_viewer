import { createStore, applyMiddleware, compose } from '../../../../../Library/Caches/typescript/2.9/node_modules/@types/react-redux/node_modules/redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

export default function configureStore(initialState) {

    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(thunk)
    );

    return createStore(
        rootReducer,
        initialState,
        enhancer
    );
}
