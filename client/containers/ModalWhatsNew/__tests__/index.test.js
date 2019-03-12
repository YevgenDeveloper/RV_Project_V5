// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import ModalWhatsNew from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(<ModalWhatsNew close={jest.fn()} />);

  expect(wrapper).toMatchSnapshot();
});
