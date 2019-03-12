// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import LoaderSpinner from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(<LoaderSpinner />);

  expect(wrapper).toMatchSnapshot();
});
