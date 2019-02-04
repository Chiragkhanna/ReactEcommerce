import { combineReducers } from 'redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

const items = (state = [], action) => {
    switch (action.type) {
      default:
        return state;
    }
  };

export default combineReducers({
    items,
  });
  