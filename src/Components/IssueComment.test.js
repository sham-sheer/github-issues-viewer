import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IssueComment from './IssueComment';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    body: 'Body',
    user: 'User'
  }

  const enzymeWrapper = mount(<IssueComment {...props} />);

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('IssueComment', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper } = setup();
      
      expect(enzymeWrapper.find('small').text()).toBe( 'User commented:');
      expect(enzymeWrapper.find('ReactMarkdown').text()).toBe( 'Body');
    })

  })
})
