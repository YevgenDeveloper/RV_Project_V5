// @flow

import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';

import { Main } from 'client/containers';

function render(Component) {
  const root = document.getElementById('railview-root');

  if (root) {
    ReactDOM.render(
      <AppContainer>
        <Component />
      </AppContainer>,
      root,
    );
  }
}

render(Main);

if (module.hot) {
  module.hot.accept('client/containers/Main', () => render(Main));
}
