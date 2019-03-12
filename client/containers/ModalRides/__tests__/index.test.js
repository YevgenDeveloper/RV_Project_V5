// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import ModalRides from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(
    <ModalRides
      rides={[]}
      currentRide="Test"
      onChangeRide={jest.fn()}
      close={jest.fn()}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
