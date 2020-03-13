import React, { Component, PropTypes } from "react"
import Select from "react-select"
import { connect } from "react-redux"
import { changeSelection } from "../../AC"

class SelectFilter extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired
  }

  handleChange = selected =>
    this.props.changeSelection(selected.map(option => option.value))

  render() {
    const { articles, selected } = this.props
    const options = articles.map(article => ({
      label: article.title,
      value: article.id
    }))

    return (
      <Select
        options={options}
        value={selected}
        isMulti={true}
        onChange={this.handleChange}
      />
    )
  }
}

export default connect(
  state => ({
    selected: state.filters.selected,
    articles: state.articles
  }),
  { changeSelection }
)(SelectFilter)
