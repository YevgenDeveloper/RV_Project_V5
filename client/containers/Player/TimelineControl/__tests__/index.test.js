// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import TimelineControl from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(
    <TimelineControl disabled={false} onChangeImage={jest.fn()} />,
  );

  expect(wrapper).toMatchSnapshot();
});
