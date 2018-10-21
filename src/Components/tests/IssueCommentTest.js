import React from 'react';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IssueComment from './Components/IssueComment';

test('IssueComment renders correctly', () => {
  // Render a checkbox with label in the document
  const checkbox = shallow(<IssueComment body="body" user="user" />);

  expect(checkbox.text()).toEqual('Off');

  checkbox.find('input').simulate('change');

  expect(checkbox.text()).toEqual('On');
});
