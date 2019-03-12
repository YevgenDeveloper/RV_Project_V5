// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import Modal from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(<Modal />);

  expect(wrapper).toMatchSnapshot();
});
