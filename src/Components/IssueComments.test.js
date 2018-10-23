import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IssueComments from './IssueComments';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    comments: [{
      body: 'body',
      user: {
        login: 'jack'
      },
      id: "123"
    }],
  }

  const enzymeWrapper = mount(<IssueComments {...props} />);

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('IssueComments', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();
      const commentProps = enzymeWrapper.find('IssueComment').props();
      expect(commentProps.body).toEqual('body');
      expect(commentProps.user).toEqual('jack');

    })
  })
})
