import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import callAPIMiddleware from '../middleware/callAPIMiddleware';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import DevTools from '../page/root/dev-tools';

const finalCreateStore = compose(
    applyMiddleware(thunk, callAPIMiddleware),
    applyMiddleware(createLogger()),
    DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');
            store.replaceReducer(nextRootReducer);
        });
    }
  return store;
}
