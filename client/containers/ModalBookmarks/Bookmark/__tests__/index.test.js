// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import Bookmark from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(
    <Bookmark ride="Test" camera="Test" image="Test" onClick={jest.fn()} />,
  );

  expect(wrapper).toMatchSnapshot();
});
