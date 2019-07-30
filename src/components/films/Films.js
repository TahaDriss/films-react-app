import React, { Component } from "react";
import Film from "./Film";
import { connect } from "react-redux";
import PropType from "prop-types";
import { getFilms } from "../../actions/FilmActions";

class Films extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "no selection",
      currentPage: 1,
      filmsPerPage: 4
    };

    this.handleChange = this.handleChange.bind(this);
    this.handlePaginationChange = this.handlePaginationChange.bind(this);
    /*Pagination*/
    this.handlePaginationClick = this.handlePaginationClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handlePreviousClick = this.handlePreviousClick.bind(this);
  }
  handlePreviousClick() {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  }
  handleNextClick() {
    const { currentPage, filmsPerPage } = this.state;
    var { Films } = this.props;

    if (currentPage < Math.ceil(Films.length / filmsPerPage)) {
      this.setState({ currentPage: currentPage + 1 });
    }
  }
  handlePaginationClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handlePaginationChange(event) {
    this.setState({ filmsPerPage: event.target.value });
  }

  componentDidMount() {
    this.props.getFilms();
  }
  getCategories() {
    const { Films } = this.props;
    const test = Films.map(x => x.category);
    var res = [test[0]];
    for (let index = 1; index < test.length; index++) {
      const element = test[index];
      if (!res.includes(element)) {
        res.push(element);
      }
    }

    return res;
  }
  render() {
    var { Films } = this.props;
    this.state.value !== "no selection"
      ? (Films = Films.filter(x => x.category === this.state.value))
      : ({ Films } = this.props);
    const categories = this.getCategories();
    /**Pagination */
    const { currentPage, filmsPerPage } = this.state;
    // Logic for displaying current films
    const indexOfLastFilm = currentPage * filmsPerPage;
    const indexOfFirstFilm = indexOfLastFilm - filmsPerPage;
    const currentFilms = Films.slice(indexOfFirstFilm, indexOfLastFilm);
    const renderFilms = currentFilms.map((Films, index) => {
      return <Film key={Films.id} film={Films} />;
    });

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(Films.length / filmsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          className="page-item"
          onClick={this.handlePaginationClick}
        >
          <a key={number} id={number} className="page-link" href="#">
            {number}
          </a>
        </li>
      );
    });
    renderPageNumbers.unshift(
      <li className="page-item" onClick={this.handlePreviousClick}>
        <a className="page-link" href="#">
          Previous
        </a>
      </li>
    );
    renderPageNumbers.push(
      <li className="page-item" onClick={this.handleNextClick}>
        <a className="page-link" href="#">
          Next
        </a>
      </li>
    );
    return (
      <React.Fragment>
        <h1 className="display-4 mb-2">
          <span className="text-primary">Film</span> List
        </h1>
        <label>
          Pick your favorite category:
          <select value={this.state.value} onChange={this.handleChange}>
            <option selected>no selection</option>
            {categories.map(cat => (
              <option value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <div className="container">
          <div className="row">{renderFilms}</div>
          {/*** */}
          <nav aria-label="Page navigation example">
            <ul className="pagination">{renderPageNumbers}</ul>
          </nav>
          number of items per page :
          <select onChange={this.handlePaginationChange}>
            <option value="4" selected>
              4
            </option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
          {/*** */}
        </div>
        <hr />
        <div />
      </React.Fragment>
    );
  }
}

Films.PropType = {
  Films: PropType.array.isRequired,
  getFilms: PropType.func.isRequired
};

const mapStateToProps = state => ({
  Films: state.film.Films
});

export default connect(
  mapStateToProps,
  { getFilms }
)(Films);
