import { combineReducers } from 'redux';
import PropTypes from 'prop-types';
import {REQUEST_PRODUCTS,RECEIVE_PRODUCTS} from './action';
import _ from 'lodash';

const items = (state = [], action) => {
  console.log(state)
  switch (action.type) {
    case REQUEST_PRODUCTS:
      return state;
    case RECEIVE_PRODUCTS:
    
      if (Array.isArray(action.products)) {
        return _.unionBy(action.products, state, 'id');
      }
      return _.unionBy([action.products], state, 'id');
    default:
      return state;
  }
};
  const isFetching = (state = 0, action) => {
    switch (action.type) {
      case REQUEST_PRODUCTS:
        return state + 1;
      case RECEIVE_PRODUCTS:
        return state - 1;
      default:
        return state;
    }
  };
  const hasMore = (state = [], action) => {
    switch (action.type) {
      case REQUEST_PRODUCTS:
      return true;
      case RECEIVE_PRODUCTS:
        return action.products.length >= 20;
      default:
        return state;
    }
  };

  
  export const productPropType = PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    permalink: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string.isRequired,
      }),
    ),
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    ).isRequired,
    average_rating: PropTypes.string.isRequired,
    rating_count: PropTypes.number.isRequired,
    variations: PropTypes.arrayOf(PropTypes.number).isRequired,
  });

export const getProductsFetching = state => state.isFetching;
export const getProductsHasMore = state => state.hasMore;
export const getProducts = state => state.items;

export default combineReducers({
    items,isFetching,hasMore
  });
  