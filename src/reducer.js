import {Map} from 'immutable';

function setState(state, newState) {
  console.log("SET STATE MERGE");
  console.log(state.merge(newState));
  console.log(state);
  console.log(newState);

  return state.merge(newState);
}

export default function(state = Map(), action) {
  switch (action.type) {
    case 'SET_STATE': {
      console.log("SET STATE");
      return setState(state, action.state);
    }
  }
  return state;
}
