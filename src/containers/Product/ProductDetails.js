import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { toastr } from 'react-redux-toastr';
import 'react-image-gallery/styles/css/image-gallery.css';
import { Header, Card, Icon, Button } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import { productPropType } from '../Products/reducer';
import { addProduct } from '../Cart/action';
// import Rating from '../../components/Rating';
import Reviews from '../../components/Reviews';
//import Variations from '../../components/Variations';
//import SocialBox from './SocialBox';
import config from '../../config/config';

//import './styles.css';

class ProductDetails extends Component {
  static isAnyCached(images) {
    return images
      .map((image) => {
        const newImage = new Image();
        newImage.src = image.original;
        return newImage.complete;
      })
      .filter(isCached => isCached === false);
  }

  constructor(props) {
    super(props);

    this.state = {
      selections: null,
      variationId: null,
      quantity : 1,
      isDescriptionToggleOn: false,isReviewToggleOn: false
    };
    
    this.receiveSelections = this.receiveSelections.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.onQuantityUpdateClick = this.onQuantityUpdateClick.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    
  }
  handleToggleClick(toggleField){

    switch(toggleField){
      case 'description':
       this.setState(state => ({
        isDescriptionToggleOn: !state.isDescriptionToggleOn
      }));break;
      case 'review':this.setState(state => ({
        isReviewToggleOn: !state.isReviewToggleOn
      }));
      break;
    }
  }

  getCategories() {
    return this.props.product.categories.map(category => category.name).join(', ');
  }

  getImageGallery() {
    return this.props.product.images.map(image => ({ original: image.src }));
  }

  /**
   * Modify component's state when a variation is selected.
   * @param {Object} selections
   * @param {Number} variationId
   */
  receiveSelections(selections, variationId) {
    this.setState({ selections, variationId });
  }
  handleQuantityChange(event){
    this.setState({quantity: event.target.value});
  }
  onQuantityUpdateClick(qtyChange){
    let tempQuantity = parseInt( this.state.quantity);
    if((tempQuantity +qtyChange) == 0)
    return;
    this.setState(state => ({
      quantity: tempQuantity + qtyChange
    }))
  }
  /**
   * Add product to cart.
   * Display a warning if the product has variations and attributes were not selected.
   */
  addItem() {
    if (this.props.product.variations.length !== 0) {
      if (_.isNull(this.state.selections)) {
        toastr.warning('Please make a selection for all of the products actions');
        return;
      }
    }

    const { dispatch } = this.props;
    const product = this.props.product;
product.variationId = this.state.variationId;
product.selections = this.state.selections;
product.quantity = this.state.quantity;
    dispatch(
      addProduct(
        product
      ),
    );

    toastr.success('Added to Cart', product.name + ' was added to your shopping cart.');
  }

  render() {
    const anyCached =
      ProductDetails.isAnyCached(this.getImageGallery())[0] === false
        ? ProductDetails.isAnyCached(this.getImageGallery())[0]
        : true;
    
    return (
      <div class="container bgwhite p-t-35 p-b-80">
      <div class="flex-w flex-sb">
        <div class="w-size13 p-t-30 respon5">
          <div class="wrap-slick3 flex-sb flex-w">
            <div class="wrap-slick3-dots"></div>
  
            <div class="slick3">
            <ImageGallery
            items={this.getImageGallery()}
            slideDuration={550}
            showPlayButton={false}
            showThumbnails={false}
            showNav={window.navigator.onLine || anyCached}
            disableSwipe={!window.navigator.onLine || !anyCached}
          />
           </div>
          </div>
        </div>
  
        <div class="w-size14 p-t-30 respon5">
          <h4 class="product-detail-name m-text16 p-b-13">
          {this.props.product.name}
          </h4>
  
          <span class="m-text17">
          {this.props.product.price ?
            (<Card.Content>
              <div dangerouslySetInnerHTML={{ __html: config.CURRENCY + this.props.product.price }} />
            </Card.Content>) : null}
          </span>
          
          <p class="s-text8 p-t-10">
            add product short description
          </p>
  
          <div class="p-t-33 p-b-60">
            <div class="flex-m flex-w p-b-10">
              <div class="s-text15 w-size15 t-center">
                Size
              </div>
  
              <div class="rs2-select2 rs3-select2 bo4 of-hidden w-size16">
                <select class="selection-2" name="size">
                  <option>Choose an option</option>
                  <option>Size S</option>
                  <option>Size M</option>
                  <option>Size L</option>
                  <option>Size XL</option>
                </select>
              </div>
            </div>
  
            <div class="flex-m flex-w">
              <div class="s-text15 w-size15 t-center">
                Color
              </div>
  
              <div class="rs2-select2 rs3-select2 bo4 of-hidden w-size16">
                <select class="selection-2" name="color">
                  <option>Choose an option</option>
                  <option>Gray</option>
                  <option>Red</option>
                  <option>Black</option>
                  <option>Blue</option>
                </select>
              </div>
            </div>
  
            <div class="flex-r-m flex-w p-t-10">
              <div class="w-size16 flex-m flex-w">
                <div class="flex-w bo5 m-r-22 m-t-10 m-b-10">
                  <button class="btn-num-product-down color1 flex-c-m size7 bg8 eff2" onClick={(e) => this.onQuantityUpdateClick(-1)}>
                    <i class="fs-12 fa fa-minus" aria-hidden="true"></i>
                  </button>
  
                  <input class="size8 m-text18 t-center num-product" type="number" value={this.state.quantity} onChange={this.handleQuantityChange}  />
  
                  <button class="btn-num-product-up color1 flex-c-m size7 bg8 eff2" onClick={(e) => this.onQuantityUpdateClick(+1)} >
                    <i class="fs-12 fa fa-plus" aria-hidden="true"></i>
                  </button>
                </div>
  
                <div class="btn-addcart-product-detail size9 trans-0-4 m-t-10 m-b-10">
                {this.props.product.backorders_allowed || this.props.product.in_stock ? (
          <button fluid="true" onClick={this.addItem} class="flex-c-m sizefull bg1 bo-rad-23 hov1 s-text1 trans-0-4">
          Add to Cart&nbsp;<Icon name="cart" />
        </button>
          ) : null}
                

                </div>
              </div>
            </div>
          </div>
  
          <div class="p-b-45">
            {this.props.product.categories.length === 0 ? null : (
            <span class="s-text8">Categories : {this.getCategories()}</span>
          )}
          </div>
          <Card.Content>{this.props.product.in_stock ? 'In Stock' : 'Out of Stock'}</Card.Content>
          {this.props.product.rating_count > 0 ? (
  <div class="p-b-45">
  
            <Card.Content extra>
              {/* <Rating
                rating={Math.round(Number(this.props.product.average_rating))}
                ratingCount={this.props.product.rating_count}
              /> */}
            </Card.Content>
          
  </div>
  ) : null}
          <div class="wrap-dropdown-content bo6 p-t-15 p-b-14 active-dropdown-content"> 
          {this.props.product.description.length === 0 ? null : (
            <h5 class="js-toggle-dropdown-content flex-sb-m cs-pointer m-text19 color0-hov trans-0-4" onClick={(e) => this.handleToggleClick('description')} >
              Description
              <i class="down-mark fs-12 color1 fa fa-minus dis-none" aria-hidden="true" style={this.state.isDescriptionToggleOn ? { display: 'block' } : { display: 'none' }}></i>
              <i class="up-mark fs-12 color1 fa fa-plus" aria-hidden="true" style={!this.state.isDescriptionToggleOn ? { display: 'block' } : { display: 'none' }}></i>
            </h5>
  )}
  {this.state.isDescriptionToggleOn ?(
            <div class="dropdown-content p-t-15 p-b-23">
              <p class="s-text8">
              {this.props.product.description.length === 0 ? null : (
              <span dangerouslySetInnerHTML={{ __html: this.props.product.description }} />
            )}
              </p>
            </div>
  )  :null}
          </div>
  
         
          <div class="wrap-dropdown-content bo7 p-t-15 p-b-14">
            <h5 class="js-toggle-dropdown-content flex-sb-m cs-pointer m-text19 color0-hov trans-0-4"  onClick={(e) => this.handleToggleClick('review')}>
              Reviews (0)  
              <i class="down-mark fs-12 color1 fa fa-minus dis-none" aria-hidden="true" style={this.state.isReviewToggleOn ? { display: 'block' } : { display: 'none' }}></i>
              <i class="up-mark fs-12 color1 fa fa-plus" aria-hidden="true" style={!this.state.isReviewToggleOn ? { display: 'block' } : { display: 'none' }}></i>
            </h5>
  {this.state.isReviewToggleOn ? (
            <div class="dropdown-content p-t-15 p-b-23">
              <p class="s-text8">
                Fusce ornare mi vel risus porttitor dignissim. Nunc eget risus at ipsum blandit ornare vel sed velit. Proin gravida arcu nisl, a dignissim mauris placerat
              </p>
            </div>
  )  :null}
          </div>
        </div>
      </div>
   
      <div>
            <Card centered>
          
          {this.props.product.rating_count > 0 ? (
            <Card.Content extra>
              {/* <Rating
                rating={Math.round(Number(this.props.product.average_rating))}
                ratingCount={this.props.product.rating_count}
              /> */}
            </Card.Content>
          ) : null}
       
          {/* {this.props.product.variations.length === 0 ? null : (
            <Variations
              sendSelections={this.receiveSelections}
              productId={this.props.product.id}
              variationIds={this.props.product.variations}
            />
          )} */}
         
        </Card>
       
        <Reviews productId={this.props.product.id} />
        {/* <SocialBox permalink={this.props.product.permalink} /> */}
      </div>
      </div>
  );
  }
}

ProductDetails.propTypes = {
  dispatch: PropTypes.func.isRequired,
  product: productPropType.isRequired,
};

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ addProduct }, dispatch));
}

export default connect(null, mapDispatchToProps)(ProductDetails);
