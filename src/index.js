import React from 'react';
import {render} from 'react-dom';

import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';
import configureStore  from './configureStore';

import App from './App';
import * as serviceWorker from './serviceWorker';


import './styles/css/bootstrap.min.css';
import './styles/fonts/font-awesome-4.7.0/css/font-awesome.min.css';
import './styles/fonts/themify/themify-icons.css';
import './styles/fonts/Linearicons-Free-v1.0.0/icon-font.min.css';
import './styles/fonts/elegant-font/html-css/style.css';
import './styles/css/util.css';
import './styles/css/main.css';


import Home from './containers/Home';
import Products from './containers/Products';
import Product from './containers/Product';
import Cart from './containers/Cart';
import Search from './containers/Search';

import './index.css';

const store = configureStore()
const routes = [
    {
      path: "/",
      component: Home
    },
    {
      path: "/product/:productId",
      component: Product,
    },
    {
        path: "/search/:search",
        component: Search
      },
      {
        path: "/cart",
        component: Cart
      },
  ];
  // wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
function RouteWithSubRoutes(route) {
    return (
      <Route
        path={route.path}
        component ={route.component}
      />
    );
  }
render(
    <Provider store={store}>
      <HashRouter>
        <App>
          <Switch>
          {/* {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))} */}
            <Route exact path="/" component={Home} />
            {/* <Route path="/categories" component={Categories} /> */}
            <Route path="/category/:categId" component={Products} />
            <Route path="/product/:productId" component={Product} />
            <Route path="/search/:search" component={Search} />
            <Route path="/cart" component={Cart} />
          </Switch>
        </App>
      </HashRouter>
    </Provider>,
    document.getElementById('root'),
  );

// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
