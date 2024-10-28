import { Component } from "react"
import axios from "axios"
import {func, number} from 'prop-types'
import { Form, Button, Alert, Container, Modal } from "react-bootstrap"

class CustomerForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            phone: '',
            errors: {},
            selectedCustomerId: null,
            isLoading: false,
            showSuccessModal: false
        }
    }

    componentDidMount() {
        const { id } = this.props.params;
        if (id) {
            this.fetchCustomerData(id);
        }
    }

    fetchCustomerData = (id) => {
        axios.get(`http://127.0.0.1:5000/customers/${id}`)
            .then(response => {
                const customerData = response.data;
                this.setState({
                    name: customerData.name,
                    email: customerData.email,
                    phone: customerData.phone,
                    selectedCustomerId: id
                });
            })
            .catch(error => {
                console.error('Error fetching customer data:', error)
            })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.customerId !== this.props.customerId){
            this.setState({selectedCustomerId: this.props.customerId})

            if(this.props.customerId){
                axios.get(`http://127.0.0.1:5000/customers/${this.state.selectedCustomerId}`).then(response => {
                    const customerData = response.data;
                    this.setState({
                        name: customerData.name,
                        email: customerData.email,
                        phone: customerData.phone
                    })
                }).catch(error => {
                    console.error(`Error fetching customer data:`, error)
                })
            }else {
                this.setState({
                    name: '', 
                    email: '', 
                    phone: ''
                })
            }
        }
    }

    validateForm = () => {
        const {name, email, phone} = this.state;
        const errors = {};
        if(!name) errors.name = 'Name is required';
        if(!email) errors.email = 'Email is required';
        if(!phone) errors.phone = 'Phone is required';
        return errors;
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0){
            const customerData = {
                name: this.state.name.trim(),
                email: this.state.email.trim(),
                phone: this.state.phone.trim()
            };

            const apiURL = this.state.selectedCustomerId
                ? `http://127.0.0.1:5000/customers/${this.state.selectedCustomerId}`
                : 'http://127.0.0.1:5000/customers';

            const httpMethod = this.state.selectedCustomerId ? axios.put : axios.post;

            httpMethod(apiURL, customerData)
                .then(() => {
                    this.setState({
                        name: '', 
                        email: '', 
                        phone: '',
                        errors: {},
                        selectedCustomerId: null,
                        isLoading: false,
                        showSuccessModal: true
                    });
                })
                .catch(error => {
                    this.setState({error: error.toString(), isLoading: false})
                })
        }else{
            this.setState({errors})
        }
        
    }

    closeModal = () => {
        this.setState({
            name: '', 
            email: '', 
            phone: '',
            errors: {},
            selectedCustomerId: null,
            showSuccessModal: false
        });
        this.props.navigate('/customers')
    }

    render() {
        const {name, email, phone, errors, error, isLoading, showSuccessModal} = this.state;

        return (
            <Container>
                {isLoading && <Alert variant="info">Submitting customer data...</Alert>}
                {error && <Alert variant="danger">Error submitting customer data: {error}</Alert>}

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formGroupName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" name="name" value={name} onChange={this.handleChange} />
                        {errors.name && <div style={{color: 'red'}}>{errors.name}</div>}
                    </Form.Group>

                    <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" name="email" value={email} onChange={this.handleChange} />
                        {errors.email && <div style={{color: 'red'}}>{errors.email}</div>}
                    </Form.Group>

                    <Form.Group controlId="formGroupPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="tel" name="phone" value={phone} onChange={this.handleChange} />
                        {errors.phone && <div style={{color: 'red'}}>{errors.phone}</div>}
                    </Form.Group>

                    <Button variant="primary" type="submit">Submit</Button>
                </Form>

                <Modal show={showSuccessModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        The customer has been successfully {this.state.selectedCustomerId ? 'updated' : 'added'}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </Container>
        )
    }
}

export default CustomerForm