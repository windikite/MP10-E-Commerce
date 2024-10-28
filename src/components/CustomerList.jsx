import { Component } from "react";
import { func } from 'prop-types';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, ListGroup, Container, Button, Alert, Modal } from "react-bootstrap";

class CustomerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            selectedCustomerId: null,
            error: null
        }
    }

    componentDidMount() {
        this.fetchCustomers();
    }

    fetchCustomers = () => {
        axios.get('http://127.0.0.1:5000/customers')
            .then(response => {
                this.setState({customers: response.data})
                console.log(this.state.customers)
            })
            .catch(error => {
                console.log('Error fetching data:', error)
                this.setState({error: 'Error fetching customers. Please try again lainer.'})
            })
    }

    selectCustomer = (id) => {
        this.setState({selectedCustomerId: id});
        this.props.onCustomerSelect(id);
    }

    deleteCustomer = (customerId) => {
        axios.delete(`http://127.0.0.1:5000/customers/${customerId}`)
            .then(() => {
                this.fetchCustomers();
            })
            .catch(error => {
                console.log('Error deleting customer:', error)
                this.setState({error: 'Error deleting customer. Please try again later.'})
            })
    }

    render(){
        const {customers, error} = this.state;
        return (
            <Container>
                {error && <Alert variant='danger'>{error}</Alert>}
                <h3 className='mb-3'>Customers</h3>
                <Button variant="primary" onClick={() => this.props.navigate(`/add-customer`)} className="w-100 mb-3">Add Customer</Button>
                <ListGroup>
                    {customers.map(customer => { return(
                        <ListGroup.Item key={customer.id} onClick={() => this.selectCustomer(customer.id)} className="d-flex justify-content-between align-items-center shadow-sm p-3 mb-3 bg-white rounded">
                            <Link to={`/edit-customer/${customer.id}`} className="text-primary">{customer.name}</Link>
                            <Button variant="danger" size="sm" onClick={() => this.deleteCustomer(customer.id)}>Delete</Button>
                        </ListGroup.Item>
                    )})}
                </ListGroup>
            </Container>
        )
    }
}

CustomerList.propTypes = {
    onCustomerSelect: func
}

export default CustomerList