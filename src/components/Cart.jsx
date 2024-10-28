import { array, func } from 'prop-types'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Badge, Modal, Dropdown } from 'react-bootstrap';

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [account, setAccount] = useState({});
    const [itemsInCart, setItemsInCart] = useState([]);
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/products')
            setProducts(response.data);
        }catch (error){
            console.error('Error fetching products:', error);
        }
    }

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/customers')
            setCustomers(response.data);
        }catch (error){
            console.error('Error fetching customers:', error);
        }
    }

    function getCart(){
        const cart = JSON.parse(localStorage.getItem('cart'));
        if(cart !== null){
            setCart(cart)
        }else{
            setCart([])
        }
    }

    function calculateTotal(){
        let total = 0;
        itemsInCart.forEach(x => {
            total+=(x.price * x.count)
        })
        return total
    }

    function filterProducts(){
        let filteredProducts = [];
        filteredProducts = products.filter(item => {
            return cart.find(x => {
                return x === item.id
            })
        })
        filteredProducts.forEach(x => {
            console.log(cart)
            x.count = cart.filter(y => y === x.id).length
        })
        console.log("filtered products", filteredProducts)
        setItemsInCart(filteredProducts)
    }

    function createCard(key, name, price, stock, src, count){
        return (
            <Card className="ms-auto me-auto mb-0 p-0 shadow border-info " style={{width: '95%', height: "10rem"}} key={key}>
                <Row>
                    <Col style={{position: "relative", height: "10rem"}}>
                        <Card.Img src={src} style={{height: "10rem", width: "10rem", position: "absolute", left: "50%", transform: "translate(-40%, 0%)"}} />
                        <Badge bg="dark" className='text-info' style={{position: "absolute", bottom: "10%", left: "60%", transform: "translate(-30%, 0%)"}}>{count}</Badge>
                    </Col>
                    <Col>
                        <Card.Body>
                            <Card.Title className="mb-0 text-start">{price}</Card.Title>
                            <Card.Text>
                                {name}
                                <br />
                                {`${stock} in stock`}
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        )
    }

    useEffect(() => {
        fetchProducts()
        fetchCustomers()
        getCart()
    }, []);

    useEffect(() => {
        if(products.length > 0 && cart.length > 0){
            filterProducts()
        }
    }, [products, cart]);

    useEffect(() => {
        if(customers.length > 0){
            setAccount({
                "id": customers[0].id,
                "name": customers[0].name
            })
        }
    }, [customers])

    function removeCapsAndSpaces(name){
        let nocaps = name.toLowerCase();
        let indexOfWhiteSpace = nocaps.indexOf(" ")
        if (indexOfWhiteSpace != -1) {
            nocaps = nocaps.slice(0, indexOfWhiteSpace) + nocaps.slice(indexOfWhiteSpace+1)
        }
        return nocaps
    }

    const checkOut = async () => {
        try {
            let items = cart.join(",")  
            const response = await axios.post(`http://127.0.0.1:5000/orders?product=${items}`, {"customer_id": account.id} )
        }catch (error){
            console.error('Error checking out cart:', error);
        }finally{
            localStorage.clear()
            setShowSuccessModal(true);
        }
    }

    function clearCart() {
        localStorage.clear();
        navigate('/products')
    }

    const handleclose = () => {
        setShowSuccessModal(false);
        navigate('/products')
    }


    return (
        <Container>
            <Row className='d-flex flex-row justify-content-around'>
                <Button variant='light' className='col col-6' style={{height: "2.255rem"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                    </svg>
                    <Badge bg="secondary">{cart.length}</Badge>
                </Button>
                <Button className="mb-3 col col-6" variant="danger" onClick={() => clearCart()}>Clear Cart</Button>
                <Dropdown className='col col-12' >
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Account
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        {customers.map(x => {
                            return <Dropdown.Item onClick={() => setAccount({
                                "id": x.id,
                                "name": x.name
                            })}>{x.name}</Dropdown.Item>
                        })}
                    </Dropdown.Menu>
                </Dropdown>
            </Row>
            <Row>
                <Col>
                    <h3 className='mb-3'>Cart</h3>
                    
                    <div className="bg-dark-subtle w-100 h-100 mx-auto p-2 rounded">
                        {itemsInCart.map(product => createCard(product.id, product.name, product.price, product.stock, `https://www.serebii.net/itemdex/sprites/sv/${removeCapsAndSpaces(product.name)}.png`, product.count))}
                    </div>
                    <Button variant="success" onClick={() => checkOut()} className="w-100 mb-3">Check Out as {account.name} - ${calculateTotal()}</Button>
                </Col>
            </Row>

            <Modal show={showSuccessModal} onHide={handleclose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Order successful!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleclose}>Close</Button>
                    </Modal.Footer>
                </Modal>
        </Container>
    )
}

Cart.protoTypes = {
    products: array
}

export default Cart