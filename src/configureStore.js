import { applyMiddleware, createStore,compose  } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { reducer as toastr } from 'react-redux-toastr';
import { persistCombineReducers, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// import monitorReducersEnhancer from './enhancers/monitorReducers'
// import loggerMiddleware from './middleware/logger'

//views
import config from './config/config';
import products from './containers/Products/reducer';
import reviews from './components/Reviews/reducer';
import cart from './containers/Cart/reducer';
//import variations from './components/Variations/reducer';
import search from './containers/Search/reducer';
import navbar from './components/NavBar/reducer';
const rootPersistConfig = {
    key: 'root',
    storage,
    blacklist: [
      'navbar',
      'search',
      'toastr',
      'products',
      'reviews',
      'variations',
      'cart',
    ],
  };
const rootReducer = persistCombineReducers(rootPersistConfig, {
    products: persistReducer(
      {
        key: 'products',
        storage,
        blacklist: config.OFFLINE ? ['isFetching', 'hasMore'] : ['isFetching', 'hasMore', 'items'],
      },
      products,
    ),
    reviews: persistReducer(
      {
        key: 'reviews',
        storage,
        blacklist: config.OFFLINE ? ['isFetching'] : ['isFetching', 'items'],
      },
      reviews,
    ),
    // variations: persistReducer(
    //   {
    //     key: 'variations',
    //     storage,
    //     blacklist: config.OFFLINE ? ['isFetching'] : ['isFetching', 'items'],
    //   },
    //   variations,
    // ),
    cart: persistReducer(
      {
        key: 'cart',
        storage,
      },
      cart,
    ),
    navbar,
    search,
    toastr,
  });

export default function configureStore(preloadedState) {
//   const middlewares = [thunkMiddleware]
//   const middlewareEnhancer = applyMiddleware(...middlewares)

//   const enhancers = [middlewareEnhancer, monitorReducersEnhancer,createLogger()]
//   const composedEnhancers = compose(...enhancers)

//   const store = createStore(rootReducer, preloadedState, composedEnhancers);
 const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
 const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunkMiddleware,createLogger())
  ));
// const store = createStore(
//   rootReducer,
//   undefined,
//   applyMiddleware(thunkMiddleware,createLogger()),
// );
  persistStore(store);

  return store
}