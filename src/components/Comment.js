import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { commentSelector } from "../selectors"

function Comment({ comment }) {
  return (
    <div>
      <p>
        {comment.text} <b>by {comment.user}</b>
      </p>
    </div>
  )
}

Comment.propTypes = {
  id: PropTypes.string.isRequired,
  // from connect

  comment: PropTypes.shape({
    text: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired
  }).isRequired
}

export default connect((state, ownProps) => {
  return {
    comment: commentSelector(state, ownProps)
  }
})(Comment)
