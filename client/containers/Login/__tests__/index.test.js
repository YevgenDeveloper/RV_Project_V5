// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import Login from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(<Login />);

  expect(wrapper).toMatchSnapshot();
});
