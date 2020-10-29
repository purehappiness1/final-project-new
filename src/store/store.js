import {createStore, applyMiddleware, compose} from 'redux';
import {reducers} from './reducers';
import thunk from 'redux-thunk'

const enhancers = compose(
  applyMiddleware(thunk),
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ); 
  const store = createStore(reducers, enhancers); 

export default store;

