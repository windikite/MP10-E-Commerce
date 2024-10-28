import { Component } from 'react'
import CustomerListWrapper from './CustomerListWrapper'
import OrderList from './OrderList';
import OrderProductList from './OrderProductList';

class CustomerOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCustomerId: null,
      selectedOrderId: null
    };
  }

  handleCustomerSelect = (customerId) => {
    this.setState({selectedCustomerId: customerId});
  }

  handleOrderSelect = (orderId) => {
    this.setState({selectedOrderId: orderId});
  }

  render(){
    const {selectedCustomerId, selectedOrderId} = this.state;

    return (
      <div className="app-container">
        <CustomerListWrapper onCustomerSelect={this.handleCustomerSelect} />
        {selectedCustomerId && (
          <OrderList
            customerId={selectedCustomerId}
            onOrderSelect={this.handleOrderSelect}
          />
        )}
        {selectedOrderId && (
          <OrderProductList
            orderId={selectedOrderId}
          />
        )}
      </div>

    );
  }
}

export default CustomerOrders
