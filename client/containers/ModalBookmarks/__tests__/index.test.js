// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import ModalBookmarks from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(
    <ModalBookmarks onClickNavigate={jest.fn()} close={jest.fn()} />,
  );

  expect(wrapper).toMatchSnapshot();
});
