import React, { Component } from "react";
import Rating from "react-rating";
import axios from "axios";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import $ from 'jquery';

class Movie extends Component {
  state = {
    comment: null,
    comments: null,
    movie_id: null,
    user: null
  };

  async componentDidMount() {
    try {
      const token = localStorage.getItem("JSONWebToken");
      const user = jwtDecode(token);
      this.setState({ user });
    } catch (error) {}
    this.getComments();
  }

  getComments = async () => {
    this.setState({ movie_id: this.props.Movie.id });
    const { data: response } = await axios.get(
      "http://localhost:9000/api/comments/" + this.props.Movie.id
    );
    this.setState({
      comments: response.data
    });
  };

  handleComments = async comm => {
    const { comment, movie_id } = comm;
    const id = this.state.user.id;
    const user_name = this.state.user.name;
    const obj = { comment, movie_id, user_name, user_id: id };
    try {
      axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
        "JSONWebToken"
      );
      const { data } = await axios.post(
        "http://localhost:9000/api/comments",
        obj
      );
      toast.success(data.message);
      this.setState({ comment: "" });
      $("#textAreaComment").val("");
      this.getComments();
    } catch (e) {
      toast.error("An error was ocurred.");
      console.log(e);
    }
  };

  handleChange = event => {
    const comment = event.target.value;
    this.setState({ comment });
  };

  validateComment = () => {
    if (this.state.comment) {
      this.handleComments({
        comment: this.state.comment,
        movie_id: this.state.movie_id
      });
    } else {
      toast.warn("You should write something before save a comment.");
    }
  };

  render() {
    const {
      Movie: movie,
      base_img_url,
      poster_size,
      showRating,
      handleRating,
      removeRating
    } = this.props;
    return (
      <section className="movie-wrapper" key={movie.id}>
        

        <div className="wrapper-rating">
          {movie.rank_id && <span className="number">{movie.rank_value}</span>}
          {showRating && (
            <div className="rating">
              <Rating
                emptySymbol="fa fa-star-o fa-2x"
                fullSymbol="fa fa-star fa-2x"
                initialRating={movie.rank_value}
                onChange={rate =>
                  handleRating({ value: rate, movie_id: movie.id })
                }
              />
            </div>
          )}
          {movie.rank_id && (
            <button
              onClick={() => removeRating(movie.rank_id)}
              type="button"
              className="btn btn-link"
            >
              remove rating
            </button>
          )}
        </div>

        {movie.poster_path != null ? (
          <img
            className="poster"
            alt={movie.title}
            src={base_img_url + poster_size + movie.poster_path}
          />
        ) : (
          <span className="no-poster">No image found in themoviedb</span>
        )}

        <h2 className="title">{movie.title}</h2>
        <span className="release-date">
          Release Date: <b>{movie.release_date}</b>
        </span>
        <p className="overview">
          {movie.overview}
          {!movie.overview && "overview not found at themoviedb."}
        </p>
        <div className="clear"></div>

        <hr />
        {this.state.user && (
          <React.Fragment>
            <label>Comments:</label>
            <div className="comments">{this.renderComments()}</div>

            <div className="footermovie">
              <div className="maxw200">
                <label htmlFor="comment">Make a comment:</label>
                <textarea
                  id="textAreaComment"
                  name="comment"
                  onChange={this.handleChange}
                  className="form-control"
                ></textarea>
                <button
                  onClick={this.validateComment}
                  type="button"
                  className="btn btn-primary btn-block btn-sm"
                >
                  Comment
                </button>
              </div>
            </div>
          </React.Fragment>
        )}
      </section>
    );
  }

  renderComments() {
    if (this.state.comments)
      return this.state.comments.map(comment => (
        <div key={comment.id} className="comment">
          <div className="user">{comment.user_name}</div>
          {comment.comment}
        </div>
      ));
  }
}

export default Movie;
