import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore} from 'redux';
import reducer from './reducer';
import App from './components/App';
import CommentBox from './components/CommentBox';

const store = createStore(reducer);

store.dispatch({

  type: 'SET_STATE',
  state: {
    commentList: [
      {
        "id": 1,
        "author": "Batman",
        "text": "I am Batman."
      },
      {
        "id": 2,
        "author": "Aquaman",
        "text": "Aquaman Aquaman."
      }
    ] // End commentList
  }   // End state

});

const routes = <Route component={App}>
  <Route path="/" component={CommentBox}  />
</Route>;

ReactDOM.render(
  <Router>{routes}</Router>,
  document.getElementById('app')
);
