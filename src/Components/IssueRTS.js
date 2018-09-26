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
      <form onSubmit={this.handleSubmit} className="form-inline">
       <div className="form-group mb-2">
          <input
            name="Issue"
            type="text"
            className="form-control"
            placeholder="Issues"
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
    );
  }
}
