/* global ipcRenderer */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';
import pink from 'material-ui/colors/pink';

import 'typeface-roboto/index.css';

import './index.css';

import store from './state';

// listeners to communicate with main process
import loadListeners from './loadListeners';

import App from './components/App';

loadListeners(store);

const theme = createMuiTheme({
  palette: createPalette({
    primary: blue, // Purple and green play nicely together.
    accent: pink,
    error: red,
  }),
});

ipcRenderer.send('read-token-from-disk');

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('app'),
);
