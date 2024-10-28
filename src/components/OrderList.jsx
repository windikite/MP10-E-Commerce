import {func, number} from 'prop-types'
import { useState, useEffect } from 'react'
import axios from 'axios';

const OrderList = ({customerId, onOrderSelect}) => {
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        if (customerId) {
            console.log(customerId)
            axios.get(`http://127.0.0.1:5000/orders_by_customer/${customerId}`)
            .then(response => {
                if(response.data.orders){
                    setOrders(Object.values(response.data.orders))
                    console.log(response.data.orders)
                }
            })
            .catch(error => {
                console.log('Error fetching data:', error)
            })
        }
    }, [customerId]);

    return (
        <div className='order-list'>
            <h3>Orders</h3>
            <ul>
                {orders.map(order => (
                    <li key={order.order_id} onClick={() => onOrderSelect(order.order_id)}>
                        Order Id: {order.order_id}, Total Cost: {order.total}, Date: {order.order_date}, Expected Delivery: {order.expected_delivery}, Status: {order.shipping_status}
                    </li>
                ))}
            </ul>
        </div>
    )
}

OrderList.protoTypes = {
    customerId: number,
    onOrderSelect: func
}

export default OrderList