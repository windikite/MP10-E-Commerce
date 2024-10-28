import { array, func } from 'prop-types'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [adminMode, setAdminMode] = useState(false)
    const [cart, setCart] = useState([])

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:5000/products');
            setProducts(response.data);
        }catch (error){
            console.error('Error fetching products:', error);
        }
    }

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/products/${id}`);
            fetchProducts();
        }catch (error){
            console.error('Error deleting product:', error);
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

    function addToCart(id){
        const cart = JSON.parse(localStorage.getItem('cart'));
        if(cart !== null){
            cart.push(id)
            localStorage.setItem("cart", JSON.stringify(cart))
        }else if(cart === null){
            localStorage.setItem("cart", JSON.stringify([id]))
        }
        getCart()
    }

    function createCard(key, name, price, stock, src){
        return (
            <Card className="ms-2 me-2 mb-0 p-0 shadow border-info" style={{width: '10rem', height: "18rem"}} key={key}>
                <Card.Img variant="top" src={src} style={{width: "100%"}}  />
                <Card.Body>
                    <Card.Title className="mb-0 text-start">{price}</Card.Title>
                    <Card.Text>
                        {name}
                        <br />
                        {`${stock} in stock`}
                        {adminMode==true && 
                            <div className='d-flex'>
                                <Button variant="warning" onClick={() => navigate(`/edit-product/${key}`)} className="me-2">Edit</Button>
                                <Button variant="danger" onClick={() => deleteProduct(key)}>Delete</Button>
                            </div>
                        }
                        {adminMode==false && 
                            <div className='d-flex'>
                                <Button variant="primary" onClick={() => addToCart(key)} className="me-2">Add to Cart</Button>
                            </div>
                        }
                    </Card.Text>
                    
                </Card.Body>
            </Card>
        )
    }

    useEffect(() => {
        fetchProducts();
        getCart();
    }, []);

    function removeCapsAndSpaces(name){
        let nocaps = name.toLowerCase();
        let indexOfWhiteSpace = nocaps.indexOf(" ")
        if (indexOfWhiteSpace != -1) {
            nocaps = nocaps.slice(0, indexOfWhiteSpace) + nocaps.slice(indexOfWhiteSpace+1)
        }
        return nocaps
    }

    function toggleAdmin(){
        if(adminMode === false){
            setAdminMode(true)
        }else if (adminMode === true){
            setAdminMode(false)
        }
    }
    

    return (
        <Container>
            <Button variant='light'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                    <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                </svg>
                <Badge bg="secondary">{cart.length}</Badge>
            </Button>
            <Row>
                <Col>
                    <h3 className='mb-3'>Products</h3>
                    <Button variant="primary" onClick={() => navigate(`/add-product`)} className="w-100 mb-3">Add Product</Button>
                    <Button variant="warning" onClick={() => toggleAdmin()} className="w-100 mb-3">Admin Mode</Button>
                    <div className="bg-dark-subtle w-100 h-100 mx-auto p-2 rounded d-flex justify-content-around flex-wrap">
                        {products.map(product => createCard(product.id, product.name, product.price, product.stock, `https://www.serebii.net/itemdex/sprites/sv/${removeCapsAndSpaces(product.name)}.png`))}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

ProductList.protoTypes = {
    products: array,
    onEditProduct: func,
    onProductDeleted: func
}

export default ProductList