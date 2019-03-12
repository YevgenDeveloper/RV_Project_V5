// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import Button from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(<Button />);

  expect(wrapper).toMatchSnapshot();
});
