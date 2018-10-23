import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IssueCommentBox from './IssueCommentBox';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    change : jest.fn(),
    commentValue : 'fre',
    submitComment : jest.fn()
  }

  const enzymeWrapper = mount(<IssueCommentBox {...props} />);

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('IssueComments', () => {
    it('should call change if length of comment text is greater than 0', () => {
      const { enzymeWrapper, props } = setup()
      const input = enzymeWrapper.find('textarea')
      expect(props.change.mock.calls.length).toBe(0)
      input.props().onChange('asd')
      expect(props.change.mock.calls.length).toBe(1)
      input.props().onChange('as')
      expect(props.change.mock.calls.length).toBe(2)

    })

    it('should call submit if length of comment text is greater than 0', () => {
      const { enzymeWrapper, props } = setup()
      const input = enzymeWrapper.find('form')
      expect(props.submitComment.mock.calls.length).toBe(0)
      input.props().onSubmit();
      expect(props.submitComment.mock.calls.length).toBe(1)
    })

  })
})
