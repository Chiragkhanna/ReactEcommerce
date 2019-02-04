import 'whatwg-fetch';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const SET_QUANTITY = 'SET_QUANTITY';

export const removeProduct = (id) => ({
  type: REMOVE_PRODUCT,
  id
});

export const addProduct = product => ({
  type: ADD_PRODUCT,
  product,
});

export const setQuantity = (id,quantity) => ({
  type: SET_QUANTITY,
  id,quantity
});