// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import PlaybackControl from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(
    <PlaybackControl
      disabledBack={false}
      disabledForward={false}
      disabled={false}
      onClickPlayBack={jest.fn()}
      onClickPlayForward={jest.fn()}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
