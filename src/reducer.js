import {Map, Record} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function newComment(state, newState) {

  var newComment = Map(newState.newComment)
  newComment = newComment.setIn(['commentedBy'], Map(newState.newComment.commentedBy))

  return state.updateIn( ['commentList'], commentList => commentList.push(newComment) )

  //var newState2 = newState
  //newState2.newComment.commentedBy = Map(newState.newComment.commentedBy)
  //return state.updateIn( ['commentList'], commentList => commentList.push(Map(newState.newComment)) )




}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE': {
      console.log(" -- 3 -- ");
      console.log(action);
      console.log(" -- /3 -- ");
      return setState(state, action.state);
    }
    case 'NEW_COMMENT': {
      return newComment(state, action.state);
    }
  }
  return state;
}
