import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Card, Grid, Button, Icon, Input,Image } from 'semantic-ui-react';
import { cartProductPropType } from './reducer';
import { setQuantity, removeProduct } from './action';
import config from '../../config/config';

class CartProduct extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          quantity: this.props.product.quantity,
          isExpanded: false,
        };
    
        this.toggleCardHeight = this.toggleCardHeight.bind(this);
        this.increaseItemQuantity = this.increaseItemQuantity.bind(this);
        this.reduceItemQuantity = this.reduceItemQuantity.bind(this);
        this.removeItem = this.removeItem.bind(this);
      }

    toggleCardHeight(){
        this.setState({ isExpanded: !this.state.isExpanded });
    }
  
    removeItem(){
        const { dispatch } = this.props;
        dispatch(removeProduct(
            this.props.product.id
        ))
    }    
    reduceItemQuantity(){
        const quantity = this.state.quantity - 1;
    this.setState({ quantity });

    const { dispatch } = this.props;
        dispatch(setQuantity(
            this.props.product.id,
            this.state.quantity
        ))
    }
    increaseItemQuantity(){
    const quantity = this.state.quantity + 1;
    this.setState({ quantity });

    const { dispatch } = this.props;
        dispatch(setQuantity(
            this.props.product.id,
            this.state.quantity
        ))
    }

render(){

    return(
        <div class="container-table-cart pos-relative">
				<div class="wrap-table-shopping-cart bgwhite">
					<table class="table-shopping-cart">
						<tr class="table-head">
							<th class="column-1"></th>
							<th class="column-2">Product</th>
							<th class="column-3">Price</th>
							<th class="column-4 p-l-70">Quantity</th>
							<th class="column-5">Total</th>
							<th class="column-6">Remove</th>
						</tr>

						<tr class="table-row">
							<td class="column-1">
								<div class="cart-img-product b-rad-4 o-f-hidden">
		<Image src={this.props.product.image} width={50} height={50} />
								</div>
							</td>
							<td class="column-2">{this.props.product.name}</td>
							<td class="column-3">  
        <Grid.Column width={4}>
        <div
          dangerouslySetInnerHTML={{
            __html:
              this.state.quantity + ' x ' + config.CURRENCY + this.props.product.price,
          }}
        />
      </Grid.Column></td>
							<td class="column-4">
								<div class="flex-w bo5 of-hidden w-size17">
									<button class="btn-num-product-down color1 flex-c-m size7 bg8 eff2" onClick={this.reduceItemQuantity}>
										<i class="fs-12 fa fa-minus" aria-hidden="true"></i>
									</button>

									<Input value={this.state.quantity} readOnly className="size8 m-text18 t-center num-product" />

									<button class="btn-num-product-up color1 flex-c-m size7 bg8 eff2" onClick={this.increaseItemQuantity}>
										<i class="fs-12 fa fa-plus" aria-hidden="true"></i>
									</button>
                                    {/* <Button icon onClick={this.reduceItemQuantity} className="btn-num-product-down color1 flex-c-m size7 bg8 eff2">
                     <Icon name="minus" />
                   </Button>
                   <Input value={this.state.quantity} readOnly className="size8 m-text18 t-center num-product" />
                   <Button icon onClick={this.increaseItemQuantity} className="btn-num-product-up color1 flex-c-m size7 bg8 eff2">
                     <Icon name="plus" />
                  </Button> */}
								</div>
							</td>
							<td class="column-5"> <Grid.Column width={4} textAlign="right">
                <div
                  dangerouslySetInnerHTML={{
                    __html: config.CURRENCY + (Math.round(Number(this.props.product.price) * Number(this.state.quantity) * 100) / 100),
                  }}
                />
              </Grid.Column></td>
                            <td class="column-6"><div class="flex-w">
                            <Button icon className="cart-delete" onClick={this.removeItem}>
                   <Icon name="trash" />
                 </Button>
                            </div> </td>
                        </tr>

					
					</table>
				</div>
			</div>
    //     <Card className="cart-product">
    //     <Card.Content>
    //       <Grid doubling>
    //         <Grid.Row centered key={this.props.product.id}>
    //           <Grid.Column width={4} textAlign="center">
    //             <Image src={this.props.product.image} width={50} height={50} />
    //           </Grid.Column>
    //           <Grid.Column width={4} className="break-words">
    //             {this.props.product.name}
    //           </Grid.Column>
    //           <Grid.Column width={4}>
    //             <div
    //               dangerouslySetInnerHTML={{
    //                 __html:
    //                   this.state.quantity + ' x ' + config.CURRENCY + this.props.product.price,
    //               }}
    //             />
    //           </Grid.Column>
    //           <Grid.Column width={4} textAlign="right">
    //             <div
    //               dangerouslySetInnerHTML={{
    //                 __html: config.CURRENCY + (Math.round(Number(this.props.product.price) * Number(this.state.quantity) * 100) / 100),
    //               }}
    //             />
    //           </Grid.Column>
    //           <div className="cart-buttons">
    //             <Button icon onClick={this.toggleCardHeight} color="black">
    //               <Icon name="pencil" />
    //             </Button>
    //             <Button icon className="cart-delete" onClick={this.removeItem}>
    //               <Icon name="trash" />
    //             </Button>
    //           </div>
    //         </Grid.Row>
    //         {this.state.isExpanded ? (
    //           <Grid.Row>
    //             <Grid.Column width={4}>
    //               <p className="cart-quantity-label">&nbsp;Quantity:</p>
    //             </Grid.Column>
    //             <Grid.Column width={10}>
    //               <Button icon onClick={this.reduceItemQuantity} className="cart-button">
    //                 <Icon name="minus" />
    //               </Button>
    //               <Input value={this.state.quantity} readOnly className="cart-quantity-input" />
    //               <Button icon onClick={this.increaseItemQuantity} className="cart-button">
    //                 <Icon name="plus" />
    //               </Button>
    //             </Grid.Column>
    //           </Grid.Row>
    //         ) : null}
    //       </Grid>
    //     </Card.Content>
    //   </Card>
    
    );
}

}

CartProduct.propTypes = {    
   product : cartProductPropType.isRequired,
   dispatch: PropTypes.func.isRequired
}

function mapDispatchToProps(dispatch) {
  return Object.assign({ dispatch }, bindActionCreators({ setQuantity, removeProduct }, dispatch));
}

export default connect(
  null,
  mapDispatchToProps,
)(CartProduct);