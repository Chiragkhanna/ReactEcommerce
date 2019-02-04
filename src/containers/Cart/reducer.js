import PropTypes from 'prop-types';
import _ from 'lodash';
import { ADD_PRODUCT, SET_QUANTITY, REMOVE_PRODUCT } from './action';
import { combineReducers } from 'redux';

export const cartProductPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  variationId: PropTypes.number,
  quantity: PropTypes.number,
  selections: PropTypes.object,
  dateAdded: PropTypes.string.isRequired,
});

const items = (state = [], action) => {

 
    switch (action.type) {
      case ADD_PRODUCT:
      let product = null;
      product = _.find(state,{id:action.product.id});
      let newProduct= null;
      if (!_.isNil(product)) {
        newProduct = Object.assign({}, product);
        newProduct.quantity += 1;
      }
      else{
        //newProduct = Object.assign({}, action.product);
         const now = new Date();
        newProduct = {
          id: action.product.id,
          price: action.product.price,
          name: action.product.name,
          image: action.product.image,
          quantity: action.product.quantity ||1,
          dateAdded: now.toString(),
        };
      }
     
      return  _.map(
        _.assign(
          _.mapKeys(state, v => v.id),
          _.mapKeys([newProduct], v => v.id)
        )
      );
      case REMOVE_PRODUCT:
      return _.filter(item => item.id !== product.id);
      case SET_QUANTITY: {
        let product = null;
        if (!_.isNil(action.variationId)) {
          product = _.find(state, { id: action.id, variationId: Number(action.variationId) });
        } else {
          product = _.find(state, { id: action.id });
        }
  
        if (!_.isNil(product)) {
          const newProduct = Object.assign({}, product, {
            quantity: action.quantity,
          });
  
          // Overwrite product with new details
          const cartProducts = _.unionBy([newProduct], state, !_.isNil(action.variationId) ? 'variationId' : 'id');
  
          // Order cart products by their added date
          return _.orderBy(cartProducts, ['dateAdded'], ['asc']);
        }
  
        return state;
      }
      default:
        return state;
    }
  };
export const getCart = state => state.items;
export default combineReducers({
    items,
  });
  