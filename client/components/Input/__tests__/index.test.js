// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import Input from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(<Input />);

  expect(wrapper).toMatchSnapshot();
});
