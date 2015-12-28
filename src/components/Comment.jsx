import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';


export default React.createClass({

  rawMarkup: function() {
    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }

});
