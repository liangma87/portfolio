import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//import { createStore } from 'redux'
//import { Provider } from 'react-redux'
//import rootReducer from './reducers'
import { BrowserRouter as Router } from 'react-router-dom';

//const store = createStore(rootReducer)

ReactDOM.render(
  //<Provider store={store}>
  <Router>
    <App />
  </Router>,
  //</Provider>,
  document.getElementById('root')
)

/*ReactDOM.render(<App />, document.getElementById('root'));*/

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
