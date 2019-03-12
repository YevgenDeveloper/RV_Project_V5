// @flow

import type { ShallowWrapper } from 'enzyme';

import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { shallow } from 'enzyme';
import Navbar from '..';

const mockStore = configureMockStore([]);

it('renders correctly', () => {
  const store = mockStore({});

  const wrapper: ShallowWrapper = shallow(
    <Provider store={store}>
      <Navbar />
    </Provider>,
  );

  expect(wrapper).toMatchSnapshot();
});
