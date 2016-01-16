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
//io.sails.autoConnect = false
io.sails.url = 'http://localhost:1337';
io.sails.connect()

/*
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
        "text": "I am Aquaman."
      }
    ] // End commentList
  }   // End state
});
*/

var xx = function(comment) {
  console.log("INSIDE YOLO > xx")
  console.log(comment)
  io.socket.get('/comment/create', comment, function(resData, jwres) {
    console.log("Created new comment")
    console.log(resData);
  });
}

const routes = <Route component={App}>
  <Route path="/" component={CommentBoxContainer} yolo={xx} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);

io.socket.on('connect', function(event) { 
  console.log(" -- 1 -- ");
  console.log("CONNECTED");
  console.log(event); 
  console.log(" -- /1 -- ");
// Runs only on server start
  io.socket.get('/comment', function(resData, jwres) {
    console.log(" -- 2 -- ");
    console.log(resData);
    /*
    resData.map(comment => {
      comment.author = comment.commentedBy.name
    })
    */
    //console.log(jwres);
    store.dispatch({type: 'SET_STATE', state: { commentList: resData}});
    console.log(" -- /2 -- ");
  });

});
//io.sails.connect()
io.socket.on('comment', function(msg) {
  console.log(" -- Comment Event -- ");
  console.log(msg); 
  store.dispatch({type: 'NEW_COMMENT', state: { newComment: msg.data }});

  console.log(" -- /Comment Event -- ");
});
io.socket.on('user', function(msg) {
  console.log(" -- User Event -- ");
  console.log(msg); 
  console.log(" -- /User Event -- ");
});

