import { IssueDescription } from './IssueDescription';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    match: {
      params: {
        id: '123',
        org: 'org',
        repo: 'repo'
      }
    },
    issue: {
      title: 'title'
    },
    comments: {

    },
    insertComment: '',
    getIssue : jest.fn(),
    getComments : jest.fn(),
    postComment : jest.fn(),
    mockhandleCommentChange : jest.fn(),
  }

  const enzymeWrapper = shallow(<IssueDescription {...props} />);

  return {
    props,
    enzymeWrapper
  }
}

describe('IssueDescription Component', () => {
  const { enzymeWrapper, props } = setup()
   it('should call the mock postComment function', () => {
     expect(props.postComment.mock.calls.length).toBe(0)
     const input = enzymeWrapper.find('IssueCommentBox')
     input.props().submitComment(
       {preventDefault() {}}
     )
     expect(props.postComment.mock.calls.length).toBe(1)
   })

   it('should call getIssue and getComments function upon mount', () => {
     expect(props.getIssue.mock.calls.length).toBe(1)
     expect(props.getComments.mock.calls.length).toBe(1)
   })

   it('should call getIssue and getComments function upon mount', () => {
     expect(props.getIssue.mock.calls.length).toBe(1)
     expect(props.getComments.mock.calls.length).toBe(1)
   })



})
