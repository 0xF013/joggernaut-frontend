import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import getStore from './store';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './components/Main';
import { IntlProvider } from 'react-intl';
import rest from './services/rest';

import './style.css';

injectTapEventPlugin();
const history = createHistory();
const store = getStore(history);
rest.setDispatch(store.dispatch);

const App = ({ isAuthenticated }) =>
  <IntlProvider locale='en'>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider>
          <Main />
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  </IntlProvider>;

export default App;
