import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { productPropType,getProducts } from '../Products/reducer';
import { fetchProducts } from '../Products/action';
import ProductCard  from '../Product/ProductCard';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
class Products extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "none",
    }; 
     this.changeSort = this.changeSort.bind(this);
  }
  changeSort(event){
    
    let sortby = {};
switch(event.target.value){
  case "popular" : this.getProducts('title','asc'); break;
  case "LowToHigh" :this.getProducts('price','asc'); break;
  case "HighTLow" : this.getProducts('price','desc');break;
}
   
   this.setState({value: event.target.value});
  }

  getProducts(orderby,order) {
    const { dispatch } = this.props;
    dispatch(fetchProducts({
      page:1,
      featured: 1,
      order: order,
      orderby: orderby,
      per_page: 20,
    }));
  }

render() {

  const items = this.props.products.map(element =>(
<ProductCard  key={element.id }
 categories={element.categories}  
 id={element.id}
 src={element.images[0].src}
 name={element.name}
 price={element.price}
 product={element}
 
 />
  ));
  return (
    <div>
<section class="bg-title-page p-t-50 p-b-40 flex-col-c-m">
  <p class="m-text13 t-center">
    New Arrivals Collection 2019
  </p>
</section>
      <section class="bgwhite p-t-55 p-b-65">
  <div class="container">
      <div class="row">
      <div class="col-sm-6 col-md-4 col-lg-3 p-b-50">
        <div class="leftbar p-r-20 p-r-0-sm">
          <h4 class="m-text14 p-b-7">
            Categories
          </h4>

          <ul class="p-b-54">
            <li class="p-t-4">
              <a href="#" class="s-text13 active1">
                All
              </a>
            </li>

            <li class="p-t-4">
              <a href="#" class="s-text13">
                Women
              </a>
            </li>

            <li class="p-t-4">
              <a href="#" class="s-text13">
                Men
              </a>
            </li>

            <li class="p-t-4">
              <a href="#" class="s-text13">
                Kids
              </a>
            </li>

            <li class="p-t-4">
              <a href="#" class="s-text13">
                Accesories
              </a>
            </li>
          </ul>
          <h4 class="m-text14 p-b-32">
            Filters
          </h4>
      

          <div class="search-product pos-relative bo4 of-hidden">
            <input class="s-text7 size6 p-l-23 p-r-50" type="text" name="search-product" placeholder="Search Products..." />

            <button class="flex-c-m size5 ab-r-m color2 color0-hov trans-0-4">
              <i class="fs-12 fa fa-search" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="col-sm-6 col-md-8 col-lg-9 p-b-50">
  <div class="flex-sb-m flex-w p-b-35">
          <div class="flex-w">
            <div class="rs2-select2 bo4 of-hidden w-size12 m-t-5 m-b-5 m-r-10">
              <select class="selection-2" onChange={this.changeSort} value={this.state.value} name="sorting">
                <option value="none">Default Sorting</option>
                <option value="popular">Popularity</option>
                <option value="LowToHigh">Price: low to high</option>
                <option value="HighTLow">Price: high to low</option>
              </select>
            </div>
          </div>

        
        </div>
        <div class="row">
        {items}
        </div>
     
  </div>
    </div>
 
    </div>
    
      
    </section>
    </div>
  );
  }
}

Products.propTypes = {
  products: PropTypes.arrayOf(productPropType).isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  products: getProducts(state.products, 0),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchProducts }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Products);

