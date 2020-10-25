import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import registerServiceWorker from './registerServiceWorker';
import 'lib-flexible';

import './scss/initialize.scss';

import configureStore from './store';
import rootSaga from './store/sagas';
// 使用自定义React路由的history对象
import { history } from './history';

import loadable from './components/loadAble';

const Main = loadable(() =>
  import(/* webpackChunkName: "Main" */ './containers/main')
);
const Home = loadable(() =>
  import(/* webpackChunkName: "home" */ './containers/home')
);
const Detail = loadable(() =>
  import(/* webpackChunkName: "detail" */ './containers/detail')
);

const store = configureStore();
store.runSaga(rootSaga);

var app = (
  <Provider store={store}>
    <Main>
      <Router history={history}>
        <Switch>
          <Route path="/index.html" component={Home} />
          <Route path="/detail.html" component={Detail} />
          <Redirect from="*" to="/index.html" />
        </Switch>
      </Router>
    </Main>
  </Provider>
);

if (process.env.NODE_ENV === 'production') {
  registerServiceWorker();
}

ReactDOM.render(app, document.getElementById('root'));
