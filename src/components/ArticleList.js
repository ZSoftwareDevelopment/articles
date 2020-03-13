import React, { Component } from "react"
import Article from "./Article/index.js"
import PropTypes from "prop-types"
import accordion from "../decorators/accordion"
import { connect } from "react-redux"
import { filtratedArticlesSelector } from "../selectors"

class ArticleList extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    //from accordion
    openItemId: PropTypes.string,
    toggleOpenItem: PropTypes.func.isRequired
  }

  render() {
    const { articles, openItemId, toggleOpenItem } = this.props

    const articleElements = articles.map(article => (
      <li key={article.id}>
        <Article
          article={article}
          isOpen={article.id === openItemId}
          toggleOpen={toggleOpenItem(article.id)}
        />
      </li>
    ))

    return <ul>{articleElements}</ul>
  }
}

export default connect(state => {
  return {
    articles: filtratedArticlesSelector(state)
  }
})(accordion(ArticleList))
