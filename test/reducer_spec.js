import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

  it('handles SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        commentList: List.of(
        Map({
          "id": 1,
          "author": "Batman",
          "text": "I am Batman."
        }),
        Map({
          "id": 2,
          "author": "Superman",
          "text": "I am son of Krypton."
        })
        ) // End commentList
      })  // End state
    };    // End action
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      commentList: [
        {
          "id": 1,
          "author": "Batman",
          "text": "I am Batman."
        },
        {
          "id": 2,
          "author": "Superman",
          "text": "I am son of Krypton."
        }
      ]   // End commentList
    }));  // End expect
  });     // End it


  it('handles SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
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
          "author": "Superman",
          "text": "I am son of Krypton."
        }
        ] // End commentList
      }   // End state
    };    // End action
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      commentList: [
        {
          "id": 1,
          "author": "Batman",
          "text": "I am Batman."
        },
        {
          "id": 2,
          "author": "Superman",
          "text": "I am son of Krypton."
        }
      ]   // End commentList
    }));  // End expect
  });     // End it


  it('handles SET_STATE without initial state', () => {
    const action = {
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
          "author": "Superman",
          "text": "I am son of Krypton."
        }
        ] // End commentList
      }   // End state
    };    // End action
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      commentList: [
        {
          "id": 1,
          "author": "Batman",
          "text": "I am Batman."
        },
        {
          "id": 2,
          "author": "Superman",
          "text": "I am son of Krypton."
        }
      ]   // End commentList
    }));  // End expect
  });     // End it


});
