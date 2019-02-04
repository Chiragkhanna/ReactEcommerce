import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loader, Container } from 'semantic-ui-react';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

import { fetchProducts } from '../Products/action';
import { getProductsFetching, getProducts, productPropType, getProductsHasMore } from '../Products/reducer';
import ProductsList from '../../containers/Products';
import { closeSearch } from '../../components/NavBar/actions';
import { isSearchVisible } from '../../components/NavBar/reducer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.loadProducts = this.loadProducts.bind(this);
  }
  componentDidMount() {

    this.getProducts(1);
  }
  loadProducts() {
    if (this.props.hasMore) {
      const items = this.props.products;

      // 20 is the default per_page number used for paginating products
      const nextPage = Math.round(items.length / 20) + 1;
      this.getProducts(nextPage);
    }
  }
  getProducts(page) {
    const { dispatch } = this.props;
    dispatch(fetchProducts({
      page,
      featured: 1,
      order: 'asc',
      orderby: 'title',
      per_page: 20,
    }));
  }

render() {
  const { loading, products, hasMore } = this.props;
  const items = products;
  if (loading === 1 && products.length === 0) {
    return (
      <div>
        <Loader active />
      </div>
    );
  }
  if (products.length === 0) {
    return (
      <Container>
        <p>No products found.</p>
      </Container>
    );
  }

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={this.loadProducts}
      hasMore={hasMore}
    >
      <ProductsList products={_.orderBy(items, ['name'], ['asc'])} title="Home" />
    </InfiniteScroll>
  );
  }


}

Home.propTypes = {
   dispatch: PropTypes.func.isRequired,
   loading: PropTypes.number.isRequired,
   products: PropTypes.arrayOf(productPropType).isRequired,
   hasMore: PropTypes.bool.isRequired,
   searchVisible: PropTypes.bool.isRequired,
   closeSearch: PropTypes.func.isRequired, 
}

const mapStateToProps = state => ({
  loading: getProductsFetching(state.products),
  products: getProducts(state.products),
  hasMore: getProductsHasMore(state.products),
  searchVisible: isSearchVisible(state.navbar),
});

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ fetchProducts, closeSearch }, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);