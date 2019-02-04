import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Card, Button, Header, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { productPropType } from '../Products/reducer';
import config from '../../config/config';
import { toastr } from 'react-redux-toastr';
import _ from 'lodash';
import { addProduct } from '../Cart/action';

class ProductCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selections: null,
      variationId: null,
    };
   
   
     this.addItem = this.addItem.bind(this);
  }

addItem(){
  const { dispatch } = this.props;
    const product = this.props.product;
    product.quantity = 1;
  dispatch(addProduct(product
  ));
  toastr.success('Added to Cart', product.name + ' was added to your shopping cart.'); 
}


  render() {
    let categories = [];
    if(this.props.categories.length>0)
    categories = this.props.categories.map(category => category.name).join(', ');

    return (
   
      <div class="col-sm-12 col-md-6 col-lg-4 p-b-50">
      <div class="block2">
        <div class="block2-img wrap-pic-w of-hidden pos-relative block2-labelnew">
          <img src={this.props.src} alt="IMG-PRODUCT" />

          <div class="block2-overlay trans-0-4">
            <a href="#" class="block2-btn-addwishlist hov-pointer trans-0-4">
              <i class="icon-wishlist icon_heart_alt" aria-hidden="true"></i>
              <i class="icon-wishlist icon_heart dis-none" aria-hidden="true"></i>
            </a>

            <div class="block2-btn-addcart w-size1 trans-0-4">
              <button class="flex-c-m size1 bg4 bo-rad-23 hov1 s-text1 trans-0-4" fluid="true" onClick={this.addItem}>
                Add to Cart  &nbsp;<Icon name="cart" />
              </button>
            </div>
          </div>
        </div>

        <div class="block2-txt p-t-20">
    <Link to={'/product/' + this.props.id}>
             <Card.Header className="break-words">{this.props.name}</Card.Header>
          </Link>
    <Card.Meta>{categories}</Card.Meta>
         
          <span class="block2-price m-text6 p-r-5">
             {this.props.price ?
    (
      <Header as="h3" color="black">
        <div dangerouslySetInnerHTML={{ __html: config.CURRENCY + this.props.price }} />
      </Header>
    )
    : null}
          </span>
        </div>
      </div>
    </div>
    );
 
  }
}

ProductCard.propTypes = {
    id : PropTypes.number.isRequired,
    name : PropTypes.string.isRequired,
    src : PropTypes.string.isRequired,
    price : PropTypes.string.isRequired,
    variations : PropTypes.arrayOf(PropTypes.number),
    categories : PropTypes.arrayOf(PropTypes.shape({
        name : PropTypes.string.isRequired
    })).isRequired,
   product : productPropType.isRequired,
   dispatch: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, addProduct, dispatch);
}

export default connect(
  null,
  mapDispatchToProps,
)(ProductCard);
  //export default ProductCard;