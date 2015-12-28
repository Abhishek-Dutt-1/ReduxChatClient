import React from 'react';
import {List, Map} from 'immutable';

const commentList = List.of(
  {
    id: 1,
    author: "Batman",
    text: "I am Batman."
  },
  {
    id: 2,
    author: "Superman",
    text: "I am son of Krypton."
  }
) // End commentList

 
export default React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, {
      commentList: commentList
    });
  }
});
