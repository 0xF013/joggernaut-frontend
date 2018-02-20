import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import services from './services';
import reducers from './ducks';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

export default function getStore(history) {
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

  return createStore(
    combineReducers({
      ...reducers,
      router: routerReducer,
      form: formReducer,
    }),
    composeEnhancers(
      applyMiddleware(thunk.withExtraArgument(services), routerMiddleware(history)),
    )
  );
}
