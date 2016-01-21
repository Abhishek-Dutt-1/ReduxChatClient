import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {List, Map} from 'immutable';
import {createStore} from 'redux';
import reducer from './reducer';
import App from './components/App';
import {CommentBoxContainer} from './components/example';
import {Provider} from 'react-redux';
import socketIOClient from 'socket.io-client';
import SailsIOClient from 'sails.io.js';

const store = createStore(reducer);

const io = SailsIOClient(socketIOClient);
io.sails.url = 'http://localhost:1337';
io.sails.connect()

var submitComment = function(comment) {
  io.socket.get('/comment/create', comment, function(resData, jwres) {
  });
}

const routes = <Route component={App}>
  <Route path="/" component={CommentBoxContainer} submitComment={submitComment} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

io.socket.on('connect', function(event) {
// Runs only on server start
  io.socket.get('/comment', function(resData, jwres) {
    store.dispatch({type: 'SET_STATE', state: { commentList: resData}});
  });
});

io.socket.on('comment', function(msg) {
  store.dispatch({type: 'NEW_COMMENT', state: { newComment: msg.data }});
});

