import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteFilm } from "../../actions/FilmActions";

class Film extends Component {
  constructor(props) {
    super(props);
    const { likes, dislikes } = this.props.film;

    this.state = {
      colorLike: "black",
      colorDislike: "black",
      likes,
      dislikes
    };

    // this.toggleLikeDislike = this.toggleLikeDislike.bind(this);
  }
  toggleLikeDislike(current) {
    const { colorDislike, colorLike } = this.state;
    if (current === "like") {
      if (colorDislike === "black" && colorLike === "black") {
        this.setState({ colorLike: "blue" });
        this.props.film.likes++;
      } else if (colorDislike === "blue" && colorLike === "black") {
        this.setState({ colorDislike: "black", colorLike: "blue" });
        this.props.film.dislikes--;
        this.props.film.likes++;
      } else {
        this.setState({ colorLike: "black" });
        this.props.film.likes--;
      }
    } else {
      if (colorDislike === "black" && colorLike === "black") {
        this.setState({ colorDislike: "blue" });
        this.props.film.dislikes++;
      } else if (colorDislike === "black" && colorLike === "blue") {
        this.setState({ colorDislike: "blue", colorLike: "black" });
        this.props.film.dislikes++;
        this.props.film.likes--;
      } else {
        this.setState({ colorDislike: "black" });
        this.props.film.dislikes--;
      }
    }
  }
  onDeleteClick = id => {
    this.props.deleteFilm(id);
  };

  render() {
    const { id, title, category, likes, dislikes } = this.props.film;
    const { colorDislike, colorLike } = this.state;
    return (
      <div
        className="card card-body mb-4 mx-auto"
        style={{ maxWidth: "25rem", minWidth: "25rem" }}
      >
        <h4>
          <strong>{title}</strong>
          <i
            className="fas fa-times"
            style={{ cursor: "pointer", float: "right", color: "red" }}
            onClick={this.onDeleteClick.bind(this, id)}
          />
        </h4>
        <li className="list-group-item">
          category:{" "}
          <span className="badge badge-primary" style={{ fontSize: "1rem" }}>
            {category}
          </span>
        </li>

        <ul
          className="list-inline"
          style={{ fontSize: "1.5rem", marginTop: "10%" }}
        >
          <li
            className="list-inline-item far fa-thumbs-up"
            style={{ float: "left", cursor: "pointer", color: colorLike }}
            onClick={() => this.toggleLikeDislike("like")}
          >
            {likes}
          </li>
          <li
            className="list-inline-item far fa-thumbs-down"
            style={{
              float: "right",
              cursor: "pointer",
              color: colorDislike
            }}
            onClick={() => this.toggleLikeDislike("dislike")}
          >
            {dislikes}
          </li>
        </ul>
      </div>
    );
  }
}

Film.propTypes = {
  film: PropTypes.object.isRequired,
  deleteFilm: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteFilm }
)(Film);
