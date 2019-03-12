// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { shallow } from 'enzyme';
import { drawTools } from 'client/constants';
import Toolbar from '..';

it('renders correctly', () => {
  const wrapper: ShallowWrapper = shallow(
    <Toolbar
      drawTools={drawTools}
      onChangeTool={jest.fn()}
      onClickUndo={jest.fn()}
      onClickRedo={jest.fn()}
      onClickClose={jest.fn()}
      onClickSave={jest.fn()}
    />,
  );

  expect(wrapper).toMatchSnapshot();
});
