import React from 'react';

const IssueCommentBox = ({ change, commentValue, submitComment }) => {
   return(
      <form onSubmit={submitComment}>
        <div className="form-group">
          <label>Comment here:</label>
            <textarea
              className="form-control"
              rows="3"
              value={commentValue}
              onChange={change}
              />
        </div>
        <input
          type="submit"
          value="Submit"
          className="btn btn-outline-dark col-sm form-group mb-2" />
      </form>
    );
}

export default IssueCommentBox;
