// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import Logo from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(<Logo />);

  expect(wrapper).toMatchSnapshot();
});
