// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import Toolbar from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(<Toolbar />);

  expect(wrapper).toMatchSnapshot();
});
