// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import ModalSaveAnnotation from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(
    <ModalSaveAnnotation
      image="Test"
      onClickSave={jest.fn()}
      close={jest.fn()}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
