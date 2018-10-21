import React from 'react';
import { connect } from 'react-redux';
import { getFilteredList } from '../redux/actions';

class IssueRTS extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault();
  }

  render() {
    const { filteredValue } = this.props;
    return(
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
                value={filteredValue}
                onChange={this.props.handleChange} />
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
      </nav>
    </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    filteredValue : state.filteredValue
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleChange: event => {
      dispatch(getFilteredList(event.target.value))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueRTS)
