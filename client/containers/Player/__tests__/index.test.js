// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import Player from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(
    <Player
      disabled={false}
      player={{ camera: 'Test', playMode: 'Test', currentImage: 0 }}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
