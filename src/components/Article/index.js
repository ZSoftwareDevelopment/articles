import React, { Component, PureComponent } from "react"
import PropTypes from "prop-types"
import { findDOMNode } from "react-dom"
import { connect } from "react-redux"
import CommentList from "../CommentList"
import { CSSTransitionGroup } from "react-transition-group"
import { deleteArticle, loadArticle } from "../../AC"
import Loader from "../Loader"
import LocalizedText from "../LocalizedText"
import "./article.css"

class Article extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
    toggleOpen: PropTypes.func,
    //from connect
    article: PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string
    })
  }

  state = {
    updateIndex: 0,
    areCommentsOpen: false
  }

  componentDidMount() {
    const { loadArticle, article, id } = this.props
    if (!article || (!article.text && !article.loading)) loadArticle(id)
  }

  /*shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isOpen !== this.props.isOpen;
  }*/

  componentWillUpdate() {
    console.log("Article updating")
  }

  render() {
    const { article, isOpen, toggleOpen } = this.props
    if (!article) return null
    return (
      <div ref={this.setContainerRef}>
        <h3>{article.title}</h3>
        <button onClick={this.handleDelete}>
          <LocalizedText>delete me</LocalizedText>
        </button>
        <CSSTransitionGroup
          transitionName="article"
          transitionAppear
          transitionEnterTimeout={300}
          transitionLeaveTimeout={500}
          transitionAppearTimeout={500}
          component="div"
        >
          {this.getBody()}
        </CSSTransitionGroup>
      </div>
    )
  }

  handleDelete = () => {
    const { deleteArticle, article } = this.props
    deleteArticle(article.id)
    console.log("---", "deleting article")
  }

  setContainerRef = ref => {
    this.container = ref
    //console.log("---", ref);
  }

  getBody() {
    const { article, isOpen } = this.props
    if (!isOpen) return null
    if (article.loading) return <Loader />
    return (
      <section>
        {article.text}
        <CommentList
          article={article}
          ref={this.setCommentsRef}
          key={this.state.updateIndex}
        />
      </section>
    )
  }

  setCommentsRef = ref => {
    this.comments = ref
    // console.log('---', findDOMNode(ref))
  }
}

export default connect(
  (state, ownProps) => {
    return {
      article: state.articles.entities.get(ownProps.id)
    }
  },
  { deleteArticle, loadArticle },
  null,
  { pure: false }
)(Article)
