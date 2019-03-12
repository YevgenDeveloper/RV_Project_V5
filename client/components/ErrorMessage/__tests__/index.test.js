// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(<ErrorMessage />);

  expect(wrapper).toMatchSnapshot();
});
