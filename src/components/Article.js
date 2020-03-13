import React, { Component, PureComponent } from "react";
import PropTypes from "prop-types";
import { findDOMNode } from "react-dom";
import CommentList from "./CommentList";

/*
we are using PureComponent. But in this case it doesn't work properly
Because on ArticleList we pass toggleOppen via props
to avoid this we can put toggleOpenItem (in ArticleList) on li element
or cache it e.t.c.
In our current case if we are passing toggleOpenItem as props (toggleOpen)
  - we create this function every time as component is updating
  - and every time it's updating we have a new props
  - this is the cause for PureComponent doesn't work properly
 */

class Article extends PureComponent {
  static propTypes = {
    article: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string
    }).isRequired,
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func
  };

  state = {
    updateIndex: 0
  };

  /*shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isOpen !== this.props.isOpen;
  }*/

  componentWillUpdate() {
    console.log("Article updating");
  }

  render() {
    const { article, isOpen, toggleOpen } = this.props;
    return (
      <div ref={this.setContainerRef}>
        <h3>{article.title}</h3>
        <button onClick={toggleOpen}>{isOpen ? "close" : "open"}</button>
        {this.getBody()}
      </div>
    );
  }

  setContainerRef = ref => {
    this.container = ref;
    //console.log("---", ref);
  };

  getBody() {
    const { article, isOpen } = this.props;
    if (!isOpen) return null;
    return (
      <section>
        {article.text}
        <button
          onClick={() =>
            this.setState({ updateIndex: this.state.updateIndex + 1 })
          }
        >
          update
        </button>
        <CommentList
          comments={article.comments}
          ref={this.setCommentsRef}
          key={this.state.updateIndex}
        />
      </section>
    );
  }

  setCommentsRef = ref => {
    // console.log('---', findDOMNode(ref))
  };
}

export default Article;
