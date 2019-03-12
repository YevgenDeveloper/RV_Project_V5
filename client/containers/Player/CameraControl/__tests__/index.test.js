// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import CameraControl from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(
    <CameraControl disabled={false} camera="Test" onChangeCamera={jest.fn()} />,
  );

  expect(wrapper).toMatchSnapshot();
});
