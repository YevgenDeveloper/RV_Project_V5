// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import Notification from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(<Notification />);

  expect(wrapper).toMatchSnapshot();
});
