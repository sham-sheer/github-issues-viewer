import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme, { shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import Issue from './Issue';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    id: '5',
    title: 'issue full title',
    user: 'jack',
    pic: 'asad',
    org: 'org',
    repo: 'repo',
    labels: [{
      name:'label name',
      color: 'label color',
      url: 'label.com',
    }],
    filteredValue : 'iss'
  }

  const enzymeWrapper = shallow(<Issue {...props} />);

  return {
    props,
    enzymeWrapper
  }
}

describe('components', () => {
  describe('Issue', () => {
    it('should render self and subcomponents', () => {
      const { enzymeWrapper, props } = setup();
    })

  })
})
