import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPost(id);
  }

  onDeleteClick() {
    const { id } = this.props.match.params;
    this.props.deletePost(id, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { post } = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div className="m-2">
        <div className="d-flex justify-content-between">
          <Link to="/" className="btn btn-secondary">
            Back
          </Link>
          <button
            onClick={this.onDeleteClick.bind(this)}
            className="btn btn-danger"
          >
            Delete Post
          </button>
        </div>
        <div className="container">
          <h3>{post.title}</h3>
          <h6>{post.categories}</h6>
          <p>{post.content}</p>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] };
}

export default connect(
  mapStateToProps,
  { fetchPost, deletePost },
)(PostsShow);
