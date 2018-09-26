import React from 'react';


export default class IssueRTS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({searchString: event.target.value});
    this.props.handleFilter(event.target.value)
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    return (
      <div>
      <nav className="level">
        <div className="level-left">
          <div className="level-item">
          <form onSubmit={this.handleSubmit} className="form-inline">
           <div className="form-group mb-2">
              <input
                name="Issue"
                type="text"
                className="form-control"
                placeholder="Search Issues here"
                value={this.state.searchString}
                onChange={this.handleChange} />
            </div>
           <div>
           <input
             type="submit"
             value="Search"
             className="btn btn-outline-dark col-sm form-group mb-2" />
            </div>
        </form>
          </div>
        </div>
        <div className="level-right">
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Labels
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </div>
        </div>
      </nav>

    </div>
    );
  }
}
